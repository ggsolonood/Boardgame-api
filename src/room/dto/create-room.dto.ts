export class CreateRoomDto {
  name: string;
  capacity: number;
  status: string;
  price: number;
  tables: string[];
  image?: string;
}
