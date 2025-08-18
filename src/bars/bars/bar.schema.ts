// bar.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bar extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  description: string;

  @Prop()
  ownerId: string; // Relacionado con usuario

  @Prop({ unique: true })
  phone: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  photo: string;

  @Prop({ type: Object })
  socialLinks: {
    facebook?: string | undefined;
    instagram?: string | undefined;
    [key: string]: string | undefined;
  };

  @Prop({ type: Object })
  hours: {
    monday?: { open: string; close: string };
    tuesday?: { open: string; close: string };
    wednesday?: { open: string; close: string };
    thursday?: { open: string; close: string };
    friday?: { open: string; close: string };
    saturday?: { open: string; close: string };
    sunday?: { open: string; close: string };
  };

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BarSchema = SchemaFactory.createForClass(Bar);
