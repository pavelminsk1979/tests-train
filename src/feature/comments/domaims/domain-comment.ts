import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class CommentatorInfo {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  userLogin: string;
}

export const CommentatorInfoShema =
  SchemaFactory.createForClass(CommentatorInfo);

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  content: string;
  @Prop({ required: true, type: CommentatorInfoShema })
  commentatorInfo: CommentatorInfo;
  @Prop({ required: true })
  createdAt: string;
}

export const CommentShema = SchemaFactory.createForClass(Comment);
