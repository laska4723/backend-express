import { injectable } from 'inversify';
import logger from '../../logger';
import { getMockUser } from '../../mocks';
import { LoginUserDto, RegisterUserDto } from './dto';

@injectable()
export class UserService {
  register(dto: RegisterUserDto) {
    logger.info(`Регистрация нового пользователя (email="${dto.email}")`);

    return getMockUser();
  }

  login(dto: LoginUserDto) {
    logger.info(`Вход пользователя (email="${dto.email}")`);

    return getMockUser();
  }
}
