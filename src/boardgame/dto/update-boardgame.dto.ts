import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardgameDto } from './create-boardgame.dto';

export class UpdateBoardgameDto extends PartialType(CreateBoardgameDto) {
  name?: string;
  description?: string;
  price?: number;
  players_min?: number;
  players_max?: number;
  duration?: number;
  category?: string;
  publisher?: string;
  thumbnail?: string;
}
