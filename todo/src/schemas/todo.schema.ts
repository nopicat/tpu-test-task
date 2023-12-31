import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
    @Prop()
    owner: string;

    @Prop()
    title: string;

    @Prop()
    description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
