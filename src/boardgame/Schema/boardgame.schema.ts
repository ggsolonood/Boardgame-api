// src/boardgames/schemas/boardgame.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BoardgameDocument = HydratedDocument<Boardgame>;

@Schema({ timestamps: true })
export class Boardgame {
  @Prop({ type: String, trim: true, required: true, maxlength: 128 })
  name!: string;

  @Prop({ type: String, trim: true, required: true, maxlength: 2048 })
  description!: string;

  @Prop({ type: Number, required: true, min: 0 })
  price!: number;

  @Prop({ type: Number, required: true, min: 1 })
  players_min!: number;

  @Prop({
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: function (this: Boardgame, v: number) {
        return typeof this.players_min === 'number' ? v >= this.players_min : true;
      },
      message: 'players_max must be >= players_min',
    },
  })
  players_max!: number;

  @Prop({ type: Number, required: true, min: 1 })
  duration!: number;

  @Prop({ type: String, trim: true, required: true })
  category!: string;

  @Prop({ type: String, trim: true, required: true })
  publisher!: string;

  @Prop({ type: String, trim: true, required: true })
  thumbnail!: string;
}

export const BoardgameSchema = SchemaFactory.createForClass(Boardgame);

BoardgameSchema.index({ name: 'text', description: 'text' });
BoardgameSchema.index({ category: 1, publisher: 1 });
