import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel: Model<Todo>,
    ) {}

    public create(owner: string, title: string, description: string) {
        return this.todoModel.create({
            owner,
            title,
            description,
        });
    }

    public get(owner: string) {
        return this.todoModel.find({
            owner,
        });
    }

    public async delete(owner: string, id: string) {
        const todo = await this.todoModel.findById(id);

        if (!todo) {
            throw new RpcException(new NotFoundException('todo was not found'));
        }

        if (todo.owner !== owner) {
            throw new RpcException(new ForbiddenException('is not an owner'));
        }

        return this.todoModel.findByIdAndDelete(id);
    }
}
