import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/entities/role.entity';
import { TokenService } from 'src/auth/token.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/profile.entity';

type CreateUserResponse = {
  user: Omit<User, 'password'>;
  message: string;
  success: boolean;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly tokenService: TokenService,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: {
        roles: true,
        orders: true,
        cart: { items: { product: true } },
        token: true,
        profile: { comments: { product: true } },
      },
    });
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        roles: true,
        orders: true,
        cart: { items: { product: true } },
        token: true,
        profile: { comments: { product: true } },
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getUserByName(name: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { name },
      relations: {
        roles: true,
        orders: true,
        cart: { items: { product: true } },
        token: true,
        profile: { comments: { product: true } },
      },
    });

    return user || null;
  }

  async create(
    newUser: CreateUserDto,
    roles: Role[],
  ): Promise<CreateUserResponse> {
    console.log('NewUser: ', newUser);
    // const existingUser = await this.userRepository.findOne({
    //   where: { name: newUser.name },
    // });

    // console.log(existingUser);

    // if (existingUser) {
    //   throw new BadRequestException(
    //     'Пользователь с таким именем уже существует',
    //   );
    // }

    const user = new User();
    user.name = newUser.name;
    user.roles = roles;

    const profile = new Profile();
    user.profile = await this.profileService.create(profile);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(newUser.password, salt);
    user.password = hash;

    await this.userRepository.save(user);

    const { password, ...userInfo } = user;

    return {
      user: userInfo,
      message: `Регистрация пользователя ${user.name} завершена успешно! 
      Для активации аккаунта перейдите по ссылке, отправленной вам на почту!`,
      success: true,
    };
  }

  async update(newUser: UpdateUserDto, id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    user.name = newUser.name;

    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
