import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

import { Payment, PaymentSchema } from './Schema/paymeny.schema';
import {
  Booking,
  BookingSchema,
} from '../booking-boardgame/Schema/booking.schema';
import { User, UserSchema } from '../users/Schema/users.schema';
import { Room, RoomSchema } from '../room/Schema/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Booking.name, schema: BookingSchema },
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
