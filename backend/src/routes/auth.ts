import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authLimiter } from '../config/security';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'super-secret-refresh-key';

const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
  password: z.string(),
}).refine(data => data.email || data.username, {
  message: "Either email or username must be provided"
});

// Helper to generate tokens
const generateTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId, role }, REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

router.post('/register', authLimiter, async (req: Request, res: Response): Promise<any> => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already in use' });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        passwordHash,
        profile: { create: {} },
        settings: { create: {} },
        learningProfile: { create: {} },
      }
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: 'REGISTER' }
    });

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({ accessToken, user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role } });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: (error as any).errors });
    }
    console.error('Register error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.post('/login', authLimiter, async (req: Request, res: Response): Promise<any> => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isValid) {
      await prisma.auditLog.create({ data: { userId: user.id, action: 'LOGIN_FAILED' } });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    });

    await prisma.auditLog.create({ data: { userId: user.id, action: 'LOGIN_SUCCESS' } });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ accessToken, user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role } });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.post('/logout', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      await prisma.session.deleteMany({ where: { refreshToken } });
    }
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { profile: true, settings: true, learningProfile: true }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const { passwordHash, ...userData } = user;
    return res.json(userData);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

export default router;
