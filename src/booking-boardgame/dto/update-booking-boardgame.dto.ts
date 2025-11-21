import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingBoardgameDto } from './create-booking-boardgame.dto';

export class UpdateBookingBoardgameDto extends PartialType(CreateBookingBoardgameDto) {}
