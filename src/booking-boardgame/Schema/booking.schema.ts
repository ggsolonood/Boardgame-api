import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true, collection: 'bookings' })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Boardgame', required: true })
  board_game_id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  room_id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Table', required: true })
  table_id!: Types.ObjectId;

  @Prop({ type: Date, required: true })
  start_time!: Date;

  @Prop({
    type: Date,
    required: true,
    validate: {
      validator(this: Booking, v: Date) {
        return this.start_time ? v > this.start_time : true;
      },
      message: 'end_time must be after start_time',
    },
  })
  end_time!: Date;

  @Prop({ type: String, required: true })
  status!: string; 

  @Prop({ type: Number, required: true, min: 1 })
  duration!: number; 

  @Prop({ type: Number, required: true, min: 0 })
  total_price!: number;

  @Prop({ type: Number, required: true, min: 1 })
  amount_player!: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.index({ user: 1, start_time: 1 });
BookingSchema.index({ room_id: 1, table_id: 1, start_time: 1 });
