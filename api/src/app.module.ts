import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import {User} from "./auth/entities/user.entity";
import { BoardModule } from './board/board.module';
import {Board} from "./board/entities/board.entity";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'hattie.db.elephantsql.com',
      port: 5432,
      username: 'yjumpshc',
      password: 'sYtJxtkosrnr5-RSZ2xkTusoDZ_GQuiU',
      database: 'yjumpshc',
      entities: [User, Board],
      synchronize: false,
    }),
    AuthModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
