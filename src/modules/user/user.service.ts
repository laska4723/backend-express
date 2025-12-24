import axios from 'axios';
import { compare, hash } from 'bcrypt';
import { CronJob } from 'cron';
import { injectable } from 'inversify';
import { UserEntity } from '../../database/entities/user.entity';
import { BadRequestException, IAmATeapotException, UnauthorizedException } from '../../exceptions';
import logger from '../../logger';
import { LoginUserDto, PasswordChangeUserDto, RegisterUserDto } from './dto';

@injectable()
export class UserService {
  private readonly updateTmpDomainsJob = new CronJob('0 */12 * * *', () => this.loadTmpDomains(), null, true);

  private tmpDomains: string[] = [];

  constructor() {
    this.loadTmpDomains();
  }

  async loadTmpDomains() {
    const { data } = await axios.get<string>(
      'https://github.com/disposable/disposable-email-domains/blob/master/domains.txt',
    );

    this.tmpDomains = data.split('\n');
  }

  async register(dto: RegisterUserDto) {
    logger.info(`Регистрация нового пользователя (email="${dto.email}")`);

    const userDomain = dto.email.split('@')[1];

    if (this.tmpDomains.includes(userDomain)) {
      throw new BadRequestException('Registration with a temporary email is not possible');
    }

    const hashedPassword = await hash(dto.password, 10);

    return await UserEntity.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });
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

  async passwordChange(dto: PasswordChangeUserDto) {
    logger.info(`Изменение пароля пользователя (email="${dto.email}")`);

    const user = await UserEntity.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await compare(dto.oldPassword, user.password);
    if (!isPasswordValid) {
      throw new IAmATeapotException();
    }

    user.password = await hash(dto.newPassword, 10);
    await user.save();

    logger.info('Пароль успешно изменён');

    return user;
  }
}
