import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { validate } from '../../validation';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserService } from './user.service';

@injectable()
export class UserController {
  public readonly router = Router();

  constructor(
    @inject(UserService)
    private readonly userService: UserService,
  ) {
    this.router.post('/login', (req: Request, res: Response) => this.login(req, res));
    this.router.post('/register', (req: Request, res: Response) => this.register(req, res));
  }

  login(req: Request, res: Response) {
    const body = validate(LoginUserDto, req.body);

    const user = this.userService.login(body);

    res.json(user);
  }

  register(req: Request, res: Response) {
    const body = validate(RegisterUserDto, req.body);

    const user = this.userService.register(body);

    res.json(user);
  }
}
