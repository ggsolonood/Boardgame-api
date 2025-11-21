import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      console.log(result);
      return {
        email: result.email,
        _id: result._id,
        role: result.role,
        name: result.name
      };
    }
    return null;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user._id ,role:user.role, name:user.name};
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
