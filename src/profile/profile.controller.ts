import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  profiles() {
    return this.profileService.getAll();
  }

  // @Post()
  // createProfile(@Body() newProfile: CreateProfileDto) {
  //   return this.profileService.create(newProfile);
  // }

  @UseGuards(AuthGuard)
  @Put()
  updateProfile(
    @Request() req,
    @Body() newProfile: UpdateProfileDto,
  ): Promise<Profile> {
    console.log('Новые данные профиля: ', newProfile);
    const user = req.user;
    return this.profileService.update(newProfile, user.username);
  }

  @Get(':id')
  profile(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getOne(id);
  }

  // @Delete(':id')
  // deleteProfile(@Param('id') id: string) {
  //   return this.profileService.delete(id);
  // }
}
