// src/table/table.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table, TableDocument } from './Schema/table.schema';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name)
    private readonly tableModel: Model<TableDocument>,
  ) {}

  async create(createTableDto: CreateTableDto) {
    const created = new this.tableModel(createTableDto);
    return created.save();
  }

  async findAll() {
    return this.tableModel.find().lean().exec();
  }

  async findOne(id: string) {
    return this.tableModel.findById(id).lean().exec();
  }

  async update(id: string, updateTableDto: UpdateTableDto) {
    return this.tableModel
      .findByIdAndUpdate(id, updateTableDto, { new: true })
      .lean()
      .exec();
  }

  async remove(id: string) {
    return this.tableModel.findByIdAndDelete(id).lean().exec();
  }
}
