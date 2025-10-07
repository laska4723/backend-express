import { compare, hash } from 'bcrypt';
import { injectable } from 'inversify';
import { UserEntity } from '../../database/entities/user.entity';
import { UnauthorizedException } from '../../exceptions';
import logger from '../../logger';
import { LoginUserDto, RegisterUserDto } from './dto';

@injectable()
export class UserService {
  async register(dto: RegisterUserDto) {
    logger.info(`Регистрация нового пользователя (email="${dto.email}")`);

    const hashedPassword = await hash(dto.password, 10);

    const user = await UserEntity.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return user;
  }

  async login(dto: LoginUserDto) {
    logger.info(`Вход пользователя (email="${dto.email}")`);

    const user = await UserEntity.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await compare(dto.password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
