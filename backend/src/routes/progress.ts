import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all progress for user
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user!.id;
    const progress = await prisma.roadmapProgress.findMany({
      where: { userId },
      orderBy: { day: 'asc' }
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true, level: true, currentStreak: true }
    });

    res.json({ progress, stats: user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Update progress for a specific day
router.post('/day/:dayId', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user!.id;
    const day = parseInt(req.params.dayId as string, 10);
    const { phase, isCompleted, theoryScore, codingScore, debugScore, xpEarned } = req.body;

    // Update or Create RoadmapProgress
    await prisma.roadmapProgress.upsert({
      where: {
        userId_day: {
          userId,
          day
        }
      },
      update: {
        isCompleted: isCompleted !== undefined ? isCompleted : undefined,
        theoryScore: theoryScore !== undefined ? theoryScore : undefined,
        codingScore: codingScore !== undefined ? codingScore : undefined,
        debugScore: debugScore !== undefined ? debugScore : undefined,
      },
      create: {
        userId,
        day,
        phase: phase || 1,
        isCompleted: isCompleted || false,
        theoryScore: theoryScore || 0,
        codingScore: codingScore || 0,
        debugScore: debugScore || 0,
      }
    });

    // If XP was earned, update user stats
    if (xpEarned > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: xpEarned }
        }
      });
      // Handle level up logic if needed
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save progress' });
  }
});

export default router;
