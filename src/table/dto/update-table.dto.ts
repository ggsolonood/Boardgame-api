import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-table.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  number: string;
  capacity: number;
  image?: string;
}
