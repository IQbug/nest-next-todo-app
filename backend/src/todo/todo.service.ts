import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) { }

    async create(createTodoDto: CreateTodoDto) {
        const todo = this.todoRepository.create({
            title: createTodoDto.title,
        });

        return await this.todoRepository.save(todo);
    }

    async findAll() {
        return await this.todoRepository.find();
    }

    async findOne(id: number) {
        return await this.todoRepository.findOne({
            where: { id },
        });
    }

    async update(
        id: number,
        updateTodoDto: UpdateTodoDto,
    ) {
        await this.todoRepository.update(
            id,
            updateTodoDto,
        );

        return this.findOne(id);
    }

    async remove(id: number) {
        await this.todoRepository.delete(id);

        return {
            message: 'Todo deleted successfully',
        };
    }
}