import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateData, DeleteData, GetData } from './todo.interfaces';

@Controller()
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @MessagePattern('create')
    public create(data: CreateData) {
        return this.todoService.create(
            data.owner,
            data.title,
            data.description,
        );
    }

    @MessagePattern('get')
    public get(data: GetData) {
        return this.todoService.get(data.owner);
    }

    @MessagePattern('delete')
    public delete(data: DeleteData) {
        return this.todoService.delete(data.owner, data.id);
    }
}
