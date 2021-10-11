import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Board} from "./entities/board.entity";
import {CreateTodoDto} from "./dto/create-todo.dto";
import { v4 as uuidv4 } from 'uuid';
import {DeleteTodoDto} from "./dto/delete-todo.dto";

@Injectable()
export class BoardService {
  constructor(
      @InjectRepository(Board) private boardRepository: typeof Board,
  ) {}
  async create(createBoardDto: CreateBoardDto, owner) {
    await this.boardRepository.create({owner, name: createBoardDto.name}).save();
    return {message: "success"}
  }

    async createTodo(createTodoDto: CreateTodoDto, owner) {
        const board = await this.boardRepository.findOne(createTodoDto.boardId);
        if (board.owner !== owner) {
            throw new ForbiddenException("Ты не можешь создать за другого пользователя!");
        }
        const id = await uuidv4();
        const todoObj = {
            id,
            text: createTodoDto.text,
            completed: false,
            important: false,
        }
        board.todos.push(todoObj);
        await board.save();
        return {message: "success"}
    }

 async findAll(owner: number) {
    const boards = await this.boardRepository.find({where: {owner}});
    return boards;
  }

 async findOne(id: number, owner: number) {
      const board = await this.boardRepository.findOne({where: {id}});
      if (!board || board.owner !== owner) {
          throw new ForbiddenException("Нет Доступа к этой доске!")
      }
      return board;
  }

    async completeTodo(id: string, boardId: number) {
        const board = await this.boardRepository.findOne({where: {id: boardId}});
        if (!board) {
            throw new BadRequestException();
        }
        const todo = board.todos.find(item => item.id === id);
        todo.completed = !todo.completed;
        await board.save();
        return {message: "success"};
    }

    async importantTodo(id: string, boardId: number) {
        const board = await this.boardRepository.findOne(boardId);
        if (!board) {
            throw new BadRequestException();
        }
        const todo = board.todos.find(item => item.id === id);
        todo.important = !todo.important;
        await board.save();
        return {message: "success"};
    }


    async remove(dto: DeleteTodoDto) {
      const board = await this.boardRepository.findOne(dto.boardId);
        if (!board) {
            throw new BadRequestException();
        }
        const todo = board.todos.find(item => item.id === dto.todoId);
        const index = board.todos.indexOf(todo);
        board.todos.splice(index, 1);
        await board.save();
        return {message: "success"};
  }
}
