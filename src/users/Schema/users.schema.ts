import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, trim: true, maxlength: 32, required: true })
  name!: string;

  @Prop({ type: String, trim: true, maxlength: 32, required: true })
  surname!: string;

  @Prop({
    type: String,
    trim: true,
    maxlength: 64,
    required: true,
    unique: true,
    lowercase: true,
  })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({
    type: String,
    default:
      'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg',
  })
  picture?: string;

  @Prop({ required: true, min: 0 })
  age!: number;

  @Prop({ type: String, default: 'User' })
  role?: string;

  @Prop({ type: Number, default: 0, min: 0 })
  point?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
