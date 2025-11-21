import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './Schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const result = new this.userModel(createUserDto);
    return result.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const result = this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .exec();
    return result;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByName(name: string): Promise<User[]> {
    const regex = new RegExp(name, 'i');
    return this.userModel
      .find({
        $or: [{ name: regex }, { surname: regex }],
      })
      .exec();
  }
  async topup(userId: string, amount: number, method: string) {
    if (!amount || amount <= 0) {
      throw new BadRequestException('amount ต้องมากกว่า 0');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }

    const currentPoint = user.point ?? 0;
    user.point = currentPoint + amount;
    await user.save();

    return {
      message: 'เติมแต้มสำเร็จ',
      method,
      point: user.point,
      user: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        point: user.point,
      },
    };
  }
}
