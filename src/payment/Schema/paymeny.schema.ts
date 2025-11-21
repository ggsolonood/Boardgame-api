import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true, collection: 'payments' })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
  booking!: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  amount!: number;        

  @Prop({ type: String, default: 'wallet' })
  method?: string;

  @Prop({
    type: String,
    enum: ['paid', 'pending', 'failed'],
    default: 'paid',
  })
  status!: string;

  @Prop({ type: Date })
  paid_at?: Date;
}


export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.index({ user: 1, booking: 1 });
