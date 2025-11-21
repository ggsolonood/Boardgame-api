import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  name: string;
  surname: string;
  email: string;
  password: string;
  picture?: string;
  age: number;
  role?: string;
  point?: number;
}
