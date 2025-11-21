import { Module } from '@nestjs/common';
import { BoardgameService } from './boardgame.service';
import { BoardgameController } from './boardgame.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardgameSchema, Boardgame } from './Schema/boardgame.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Boardgame.name, schema: BoardgameSchema }]),
  ],
  controllers: [BoardgameController],
  providers: [BoardgameService],
})
export class BoardgameModule {}
