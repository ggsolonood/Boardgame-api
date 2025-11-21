export class CreateAuthDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  picture?: string;
  age: number;
  role?: string;
  point?: number;
}
