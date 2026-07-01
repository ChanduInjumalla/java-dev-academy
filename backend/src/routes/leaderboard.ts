import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get Top 50 Users by XP
router.get('/', async (req, res: Response): Promise<any> => {
  try {
    const topUsers = await prisma.user.findMany({
      take: 50,
      orderBy: [
        { xp: 'desc' },
        { currentStreak: 'desc' }
      ],
      select: {
        id: true,
        username: true,
        name: true,
        xp: true,
        level: true,
        currentStreak: true,
      }
    });
    
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
