import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import {User} from "./auth/entities/user.entity";
import { TodoModule } from './todo/todo.module';
import {Todo} from "./todo/entities/todo.entity";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'hattie.db.elephantsql.com',
      port: 5432,
      username: 'yjumpshc',
      password: 'sYtJxtkosrnr5-RSZ2xkTusoDZ_GQuiU',
      database: 'yjumpshc',
      entities: [User, Todo],
      synchronize: true,
    }),
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
