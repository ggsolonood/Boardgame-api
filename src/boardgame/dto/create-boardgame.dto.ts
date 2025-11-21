// src/boardgames/dto/create-boardgame.dto.ts
export class CreateBoardgameDto {
  name: string;
  description: string;
  price: number;
  players_min: number;
  players_max: number;
  duration: number;
  category: string;
  publisher: string;
  thumbnail: string;
}
