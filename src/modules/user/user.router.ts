import express, { Request, Response } from 'express';
import { logger } from '../../logger';
import { getMockUser } from '../../mocks';
import { validate } from '../../validation';
import { LoginUserDto, RegisterUserDto } from './dto';

export const userRouter = express.Router();

userRouter.post('/register', (req: Request, res: Response) => {
  logger.info('Регистрация пользователя');

  const dto = validate(RegisterUserDto, req.body);

  console.log(req.body);

  res.json(getMockUser());
});

userRouter.post('/login', (req: Request, res: Response) => {
  logger.info('Вход пользователя');

  const dto = validate(LoginUserDto, req.body);

  console.log(req.body);

  res.json({ success: true });
});

userRouter.get('/profile', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockUser());
});

userRouter.put('/profile', (req: Request, res: Response) => {
  logger.info('PUT request received');

  res.json({ success: true });
});

userRouter.post('/password/restore', (req: Request, res: Response) => {
  logger.info('POST request received');

  res.json({ success: true });
});

userRouter.put('/password/change', (req: Request, res: Response) => {
  logger.info('PUT request received');

  res.json({ success: true });
});
