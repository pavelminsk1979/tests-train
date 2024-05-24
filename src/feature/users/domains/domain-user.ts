import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
/*описана типизация умного обьекта  полученный
 с помощью Mongoose
 такой типизацией можно типизировать документ
    до обращения в базу данных и у него еще не
    будет (_id)   и такойже типизацией можно
    типизировать после обращения к базе данных*/
export type UserDocument = HydratedDocument<User>;
///////////////////////
/*
КОГДА СХЕМА СОЗДАНА НАДО В ФАЙЛЕ app.module.ts 
внутрь массива imports добавить
  
MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  }])
    --User.name  у класса(не у экземпляра класса) берут имя оно будет примерно такое -- 'user'*/
//////////////////////////////////

/*Декоратор @Schema() применяется к классу User.
  Он указывает, что класс User является схемой Mongoose.

  /////////////////////
  схема для конкретной коллекции и в ней прописываются
  поля которые будут у документа который в базу данных
  помещается... АЙДИШКУ база сама добавит
  */
@Schema()
export class User {
  /*  Декоратор @Prop() применяется к каждому свойству в классе User.
   Он указывает, что свойство должно быть учтено при создании схемы Mongoose.*/
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  createdAt: string;
}

/*ТУТ В АРГУМЕНТ ПОМЕЩАЕТСЯ КЛАСС User  и в переменную
UserSchema  получаю СХЕМУ*/
export const UserSchema = SchemaFactory.createForClass(User);
