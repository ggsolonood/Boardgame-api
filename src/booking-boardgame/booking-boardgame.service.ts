import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model, Types } from 'mongoose';
import { CreateBookingBoardgameDto } from './dto/create-booking-boardgame.dto';
import { UpdateBookingBoardgameDto } from './dto/update-booking-boardgame.dto';
import { Booking, BookingDocument } from './Schema/booking.schema';
import { Room, RoomDocument } from '../room/Schema/room.schema';

@Injectable()
export class BookingBoardgameService {
  private readonly logger = new Logger(BookingBoardgameService.name);
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingBoardgameModel: Model<BookingDocument>,
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {}

  async create(
    createBookingBoardgameDto: CreateBookingBoardgameDto,
  ): Promise<Booking> {
    const created = new this.bookingBoardgameModel(createBookingBoardgameDto);
    return created.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingBoardgameModel.find().exec();
  }

  async findOne(id: string): Promise<Booking | null> {
    return this.bookingBoardgameModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBookingBoardgameDto: UpdateBookingBoardgameDto,
  ): Promise<Booking | null> {
    return this.bookingBoardgameModel
      .findByIdAndUpdate(id, updateBookingBoardgameDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Booking | null> {
    return this.bookingBoardgameModel.findByIdAndDelete(id).exec();
  }

  async findByUser(userId: string): Promise<Booking[]> {
    return this.bookingBoardgameModel.find({ user: userId }).exec();
  }
  @Cron(CronExpression.EVERY_30_MINUTES)
  async releaseExpiredRooms() {
    const now = new Date();

    const expired = await this.bookingBoardgameModel
      .find({
        end_time: { $lte: now },
        status: { $in: ['confirmed'] },
      })
      .select('_id room_id')
      .lean()
      .exec();

    if (!expired.length) return;

    const bookingIds = expired.map((b) => b._id as Types.ObjectId);
    const roomIds = expired
      .map((b) => b.room_id as Types.ObjectId)
      .filter(Boolean);

    await this.bookingBoardgameModel.updateMany(
      { _id: { $in: bookingIds } },
      { $set: { status: 'done' } },
    );

    await this.roomModel.updateMany(
      { _id: { $in: roomIds }, status: 'in_use' },
      { $set: { status: 'available' } },
    );

    this.logger.log(
      `Released ${roomIds.length} rooms from expired bookings (${bookingIds.length} bookings).`,
    );
  }
}
