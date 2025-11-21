import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
  sub: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
  name?: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    // ❗ ใช้ตัวแปร config (พารามิเตอร์) ยังไม่ใช่ this.config
    const secret =
      process.env.JWT_SECRET || config.get<string>('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    if (!secret) {
      console.error('JWT_SECRET is MISSING in JwtStrategy');
    } else {
      console.log('JWT_SECRET loaded in JwtStrategy');
    }
  }

  async validate(payload: JwtPayload) {
    return {
      _id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  }
}
