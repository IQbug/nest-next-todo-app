import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '9933',
      database: 'todo_db',

      entities: [Todo],

      synchronize: true,
    }),

    TodoModule,
  ],
})
export class AppModule { }