// src/categories/schemas/category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, trim: true, maxlength: 128, required: true })
  name!: string;

  @Prop({ type: String, trim: true, required: true })
  description!: string;

  @Prop({ type: String, required: true })
  topics!: string; // ถ้าอนาคตอยากเป็น array ก็เปลี่ยนเป็น [String]
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// เผื่อค้นหา
CategorySchema.index({ name: 'text', description: 'text' });
