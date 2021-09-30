import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {Todo} from "./entities/todo.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TodoService {
  constructor(
      @InjectRepository(Todo) private todoRepository: typeof Todo,
  ) {}
  async create(createTodoDto: CreateTodoDto, owner: any) {
    await this.todoRepository.create({owner, text: createTodoDto.text}).save();
    return {message: "success"};
  }

  async findAll(owner: any) {
    const todos = await this.todoRepository.find({where: {owner}, select: ["id","text", "completed", "important"]});
    return todos;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async complete(id: number) {
    const todo = await this.todoRepository.findOne({where: {id}});
    if (!todo) {
      throw new NotFoundException();
    }
    todo.completed = !todo.completed;
    await todo.save();
    return {message: "success"};
  }
  async important(id: number) {
    const todo = await this.todoRepository.findOne({where: {id}});
    if (!todo) {
      throw new NotFoundException();
    }
    todo.important = !todo.important;
    await todo.save();
    return {message: "success"};
  }

  async remove(id: number) {
    await this.todoRepository.delete(id);
    return {message: "success"};
  }
}
