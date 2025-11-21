import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BoardgameService } from './boardgame.service';
import { CreateBoardgameDto } from './dto/create-boardgame.dto';
import { UpdateBoardgameDto } from './dto/update-boardgame.dto';

@Controller('boardgame')
export class BoardgameController {
  constructor(private readonly boardgameService: BoardgameService) {}

  @Post()
  create(@Body() createBoardgameDto: CreateBoardgameDto) {
    return this.boardgameService.create(createBoardgameDto);
  }

  @Get('findname')
  findByName(@Query('name') name: string) {
    const text = name?.trim() ?? '';
    if (!text) {
      return this.boardgameService.findAll();
    }
    return this.boardgameService.findByName(text);
  }

  @Get()
  findAll() {
    return this.boardgameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardgameService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardgameDto: UpdateBoardgameDto,
  ) {
    return this.boardgameService.update(id, updateBoardgameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardgameService.remove(id);
  }
}
