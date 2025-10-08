import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { validate } from '../../validation';
import { ChangePasswordUserDto, LoginUserDto, RegisterUserDto } from './dto';
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
    this.router.post('/change', (req: Request, res: Response) => this.change(req, res));
  }

  async login(req: Request, res: Response) {
    const body = validate(LoginUserDto, req.body);

    const user = await this.userService.login(body);

    res.json(user);
  }

  async register(req: Request, res: Response) {
    const body = validate(RegisterUserDto, req.body);

    const user = await this.userService.register(body);

    res.json(user);
  }

  async change(req: Request, res: Response) {
    const body = validate(ChangePasswordUserDto, req.body);

    const user = await this.userService.change(body);

    res.json(user);
  }
}
