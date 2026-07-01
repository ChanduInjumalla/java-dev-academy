import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get comments for a specific day
router.get('/day/:day', async (req: any, res: Response): Promise<any> => {
  try {
    const day = parseInt(req.params.day, 10);
    if (isNaN(day)) {
      return res.status(400).json({ error: 'Invalid day parameter' });
    }

    const comments = await prisma.comment.findMany({
      where: { day },
      include: {
        user: {
          select: { id: true, name: true, username: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Post a new comment
router.post('/', authenticate, async (req: any, res: Response): Promise<any> => {
  try {
    const { day, content } = req.body;
    const userId = req.user?.id;

    if (!userId || !day || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newComment = await prisma.comment.create({
      data: {
        userId,
        day: parseInt(day, 10),
        content
      },
      include: {
        user: {
          select: { id: true, name: true, username: true }
        }
      }
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

export default router;
