import {} from 'class-validator';

export class CreateProfileDto {
  firstName: string;
  lastName: string;
  image: string;
  city: string;
  address: string;
}

export class UpdateProfileDto {
  firstName: string;
  lastName: string;
  image: string;
  city: string;
  address: string;
}
