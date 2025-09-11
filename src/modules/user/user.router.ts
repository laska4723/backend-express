import express, { Request, Response } from 'express';
import { logger } from '../../logger';
import { getMockUser } from '../../mocks';

export const userRouter = express.Router();

userRouter.get('/user', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockUser());
});

userRouter.get('/user/profile', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockUser());
});

userRouter.get('/user/profile/id', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockUser());
});

userRouter.post('/user/login', (req: Request, res: Response) => {
  logger.info('POST request received');
  res.json({ success: true });
});

userRouter.post('/user/register', (req: Request, res: Response) => {
  logger.info('POST request received');
  res.json(getMockUser());
});

userRouter.post('/user//user/logout', (req: Request, res: Response) => {
  logger.info('POST request received');
  res.json({ success: true });
});

userRouter.post('/user/password/restore', (req: Request, res: Response) => {
  logger.info('POST request received');
  res.json({ success: true });
});

userRouter.put('/user/profile', (req: Request, res: Response) => {
  logger.info('PUT request received');
  res.json({ success: true });
});

userRouter.put('/user/password/change', (req: Request, res: Response) => {
  logger.info('PUT request received');
  res.json({ success: true });
});

userRouter.delete('/user/:id', (req: Request, res: Response) => {
  logger.info('DELETE request received');
  res.json({ success: true });
});
