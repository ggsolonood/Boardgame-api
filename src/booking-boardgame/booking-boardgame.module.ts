import { Module } from '@nestjs/common';
import { BookingBoardgameService } from './booking-boardgame.service';
import { BookingBoardgameController } from './booking-boardgame.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './Schema/booking.schema';
import { Room, RoomSchema } from '../room/Schema/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [BookingBoardgameController],
  providers: [BookingBoardgameService],
  exports: [BookingBoardgameService],
})
export class BookingBoardgameModule {}
