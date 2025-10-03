import { injectable } from 'inversify';
import { UserEntity } from '../../database/entities/user.entity';
import { UnauthorizedException } from '../../exceptions';
import logger from '../../logger';
import { getMockUser } from '../../mocks';
import { LoginUserDto, RegisterUserDto } from './dto';

@injectable()
export class UserService {
  async register(dto: RegisterUserDto) {
    logger.info(`Регистрация нового пользователя (email="${dto.email}")`);

    const user = await UserEntity.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    return user;
  }

  async login(dto: LoginUserDto) {
    logger.info(`Вход пользователя (email="${dto.email}")`);

    const user = await UserEntity.findOne({
      where: {
        email: dto.email,
        password: dto.password,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return getMockUser();
  }
}
