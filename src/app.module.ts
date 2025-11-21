import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardgameModule } from './boardgame/boardgame.module';
import { CategoryModule } from './category/category.module';
import { PaymentModule } from './payment/payment.module';
import { RoomModule } from './room/room.module';
import { TableModule } from './table/table.module';
import { BookingBoardgameModule } from './booking-boardgame/booking-boardgame.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        'mongodb+srv://labsaig:12345@cluster0.iuf81hq.mongodb.net/your-database-name',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    BoardgameModule,
    CategoryModule,
    PaymentModule,
    ScheduleModule.forRoot(),
    RoomModule,
    TableModule,
    BookingBoardgameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
