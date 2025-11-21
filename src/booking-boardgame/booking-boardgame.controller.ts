import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { BookingBoardgameService } from './booking-boardgame.service';
import { CreateBookingBoardgameDto } from './dto/create-booking-boardgame.dto';
import { UpdateBookingBoardgameDto } from './dto/update-booking-boardgame.dto';

@Controller('booking-boardgame')
export class BookingBoardgameController {
  constructor(
    private readonly bookingBoardgameService: BookingBoardgameService,
  ) {}

  @Post()
  create(@Body() createBookingBoardgameDto: CreateBookingBoardgameDto) {
    return this.bookingBoardgameService.create(createBookingBoardgameDto);
  }

  @Get()
  findAll() {
    return this.bookingBoardgameService.findAll();
  }
  @Get('user/:id')
  async findByUser(@Param('id') id: string) {
    const bookings = await this.bookingBoardgameService.findByUser(id);
    return { data: bookings };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingBoardgameService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookingBoardgameDto: UpdateBookingBoardgameDto,
  ) {
    return this.bookingBoardgameService.update(id, updateBookingBoardgameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingBoardgameService.remove(id);
  }
}
