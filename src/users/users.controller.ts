// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('findname')
  findByName(@Query('name') name: string) {
    const text = name?.trim() ?? '';
    if (!text) {
      return this.usersService.findAll();
    }
    return this.usersService.findByName(text);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getprofile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('topup')
  async topup(@Request() req, @Body() body: { amount: number; method?: string }) {
    const userId = req.user.userId || req.user._id || req.user.id;

    if (!userId) {
      throw new BadRequestException('ไม่พบข้อมูลผู้ใช้จาก token');
    }

    const amount = Number(body.amount);
    if (!amount || amount <= 0) {
      throw new BadRequestException('amount ต้องมากกว่า 0');
    }

    const method = body.method ?? 'topup';

    return this.usersService.topup(userId, amount, method);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
