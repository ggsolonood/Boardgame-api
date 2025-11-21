import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardgameDto } from './dto/create-boardgame.dto';
import { UpdateBoardgameDto } from './dto/update-boardgame.dto';
import { Boardgame, BoardgameDocument } from './Schema/boardgame.schema'; 

@Injectable()
export class BoardgameService {
  constructor(
    @InjectModel(Boardgame.name)
    private readonly boardgameModel: Model<BoardgameDocument>,
  ) {}

  async create(createBoardgameDto: CreateBoardgameDto): Promise<Boardgame> {
    const created = new this.boardgameModel(createBoardgameDto);
    return created.save();
  }

  async findAll(): Promise<Boardgame[]> {
    return this.boardgameModel.find().exec();
  }

  async findOne(id: string): Promise<Boardgame | null> {
    return this.boardgameModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBoardgameDto: UpdateBoardgameDto,
  ): Promise<Boardgame | null> {
    return this.boardgameModel
      .findByIdAndUpdate(id, updateBoardgameDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Boardgame | null> {
    return this.boardgameModel.findByIdAndDelete(id).exec();
  }

  async findByName(name: string): Promise<Boardgame[]> {
    const regex = new RegExp(name, 'i');
    return this.boardgameModel
      .find({
        $or: [{ name: regex }, { surname: regex }],
      })
      .exec();
  }
}
