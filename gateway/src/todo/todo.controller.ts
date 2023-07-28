import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { IUser } from '../auth/user.interface';
import { RequiredPipe } from '../common/pipes/required.pipe';

@Controller()
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    public create(
        @User() user: IUser,
        @Body('title', RequiredPipe) title: string,
        @Body('description', RequiredPipe) description: string,
    ) {
        return this.todoService.create(user.id, title, description);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get')
    public get(@User() user: IUser) {
        return this.todoService.get(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    public delete(@User() user: IUser, @Body('id', RequiredPipe) id: string) {
        return this.todoService.delete(user.id, id);
    }
}
