import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async pay(@Req() req: any, @Body() createPaymentDto: CreatePaymentDto) {
    const userId =
      req.user?.userId ||
      req.user?._id ||
      req.user?.id ||
      req.user?.sub; 

    if (!userId) {
      throw new UnauthorizedException('ไม่พบ user id ใน token');
    }

    return this.paymentService.payForBooking(String(userId), createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyPayments(@Req() req: any) {
    const u =
      req.user?.userId ||
      req.user?._id ||
      req.user?.id ||
      req.user?.sub;

    if (!u) {
      throw new UnauthorizedException('ไม่พบ user id ใน token');
    }

    const data = await this.paymentService.findByUser(String(u));
    return { data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
