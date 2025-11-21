import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TableDocument = HydratedDocument<Table>;

@Schema({ timestamps: true, collection: 'tables' })
export class Table {
  @Prop({ type: String, trim: true, maxlength: 128, required: true })
  number!: string;

  @Prop({ type: Number, required: true, min: 1 })
  capacity!: number;

  @Prop({ type: String, trim: true })
  image?: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);

TableSchema.index({ number: 1 });
