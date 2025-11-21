import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  surname: string;
  email: string;
  password: string;
  picture?: string;
  age: number;
  role?: string;
  point?: number;
}
