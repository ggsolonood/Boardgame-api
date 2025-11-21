export class CreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  picture?: string;
  age: number;
  role?: string;
  point?: number;
}
