import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

import { Payment, PaymentDocument } from './Schema/paymeny.schema';

import {
  Booking,
  BookingDocument,
} from '../booking-boardgame/Schema/booking.schema';
import { User, UserDocument } from '../users/Schema/users.schema';
import { Room, RoomDocument } from '../room/Schema/room.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,

    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const created = new this.paymentModel(createPaymentDto);
    return created.save();
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }

  async findOne(id: string): Promise<Payment | null> {
    return this.paymentModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment | null> {
    return this.paymentModel
      .findByIdAndUpdate(id, updatePaymentDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Payment | null> {
    return this.paymentModel.findByIdAndDelete(id).exec();
  }

  async findByUser(userId: string): Promise<Payment[]> {
    return this.paymentModel
      .find({ user: new Types.ObjectId(userId) }) 
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async payForBooking(userId: string, dto: CreatePaymentDto) {
    const { bookingId } = dto;

    if (!bookingId) {
      throw new BadRequestException('bookingId is required');
    }

    const booking = await this.bookingModel.findById(bookingId).exec();
    if (!booking) {
      throw new NotFoundException('ไม่พบข้อมูลการจอง');
    }

    if (booking.user.toString() !== userId.toString()) {
      throw new ForbiddenException('คุณไม่มีสิทธิ์ชำระเงินให้การจองนี้');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('ไม่พบผู้ใช้');
    }

    const total = booking.total_price ?? 0;
    if (total < 0) {
      throw new BadRequestException('ยอดชำระไม่ถูกต้อง');
    }

    const currentPoint = user.point ?? 0;

    if (currentPoint < total) {
      throw new BadRequestException(
        `แต้มของคุณไม่เพียงพอสำหรับการจองนี้ (ต้องใช้ ${total} แต้ม, คุณมี ${currentPoint} แต้ม)`,
      );
    }

    user.point = currentPoint - total;
    await user.save();

    const payment = await this.paymentModel.create({
      user: new Types.ObjectId(userId),
      booking: booking._id,
      amount: total, 
      method: 'wallet', 
      status: 'paid',
      paid_at: new Date(),
    });

    (booking as any).payment = payment._id;
    booking.status = 'confirmed';
    await booking.save();

    await this.roomModel.findByIdAndUpdate(booking.room_id, {
      status: 'in_use',
    });

    return {
      message: 'ชำระเงินสำเร็จ',
      data: payment,
    };
  }
}
