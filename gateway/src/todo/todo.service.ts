import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';

@Injectable()
export class TodoService {
    constructor(
        @Inject('TODO_CLIENT')
        private readonly todoClient: ClientProxy,
    ) {}

    public async create(owner: string, title: string, description: string) {
        const todo = await firstValueFrom(
            this.todoClient.send('create', { owner, title, description }),
        );

        return {
            id: todo._id,
        };
    }

    public async get(owner: string) {
        const todos = await firstValueFrom(
            this.todoClient.send('get', { owner }),
        );

        return todos.map((todo) => ({
            id: todo._id,
            title: todo.title,
            description: todo.description,
        }));
    }

    public async delete(owner: string, id: string) {
        const todo = await firstValueFrom(
            this.todoClient
                .send('delete', { owner, id })
                .pipe(
                    catchError((error) =>
                        throwError(() => new RpcException(error.response)),
                    ),
                ),
        );

        return {
            id: todo._id,
        };
    }
}
