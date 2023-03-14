import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  getAll(): Promise<Profile[]> {
    return this.profileRepository.find({
      relations: { user: true, comments: true },
    });
  }

  getOne(id: number): Promise<Profile> {
    return this.profileRepository.findOne({
      where: { id },
      relations: { user: true, comments: true },
    });
  }

  async create(newProfile: CreateProfileDto | null): Promise<Profile> {
    return await this.profileRepository.save(newProfile);
  }

  async update(
    newProfile: UpdateProfileDto,
    username: string,
  ): Promise<Profile> {
    const user = await this.userService.getUserByName(username);
    const profile = await this.getOne(user.profile.id);
    profile.firstName = newProfile.firstName;
    profile.lastName = newProfile.lastName;
    profile.image = newProfile.image;
    profile.city = newProfile.city;
    profile.address = newProfile.address;
    return this.profileRepository.save(profile);
  }

  async delete(id: string): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
