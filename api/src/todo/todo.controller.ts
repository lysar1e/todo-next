import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("create")
  create(@Body() createTodoDto: CreateTodoDto, @Req() request: Request) {
    // @ts-ignore
    return this.todoService.create(createTodoDto, request.user.id);
  }

  @UseGuards(AuthGuard("auth"))
  @Get("get")
  findAll(@Req() request: Request) {
    // @ts-ignore
    return this.todoService.findAll(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch('/complete/:id')
  complete(@Param('id') id: string) {
    return this.todoService.complete(+id);
  }
  @UseGuards(AuthGuard("jwt"))
  @Patch('/important/:id')
  important(@Param('id') id: string) {
    return this.todoService.important(+id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
