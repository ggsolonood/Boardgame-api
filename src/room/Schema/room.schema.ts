import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true, collection: 'rooms' })
export class Room {
  @Prop({ type: String, trim: true, maxlength: 128, required: true })
  name!: string;

  @Prop({ type: Number, required: true, min: 1 })
  capacity!: number;

  @Prop({ type: String, required: true })
  status!: string;

  @Prop({ type: [String], required: true })
  tables!: string[];

  @Prop({ type: Number, required: true, min: 0 })
  price!: number;

  @Prop({ type: String, trim: true })
  image?: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.index({ status: 1 });
RoomSchema.index({ name: 1 });
