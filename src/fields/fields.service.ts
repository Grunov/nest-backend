import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFieldDto } from './dto/create-field.dto';
import { CreateFieldsTypeDto } from './dto/create-fields-type.dto';
import { FieldsTypesModel } from './fields-types.model';
import { FieldsModel } from './fields.model';

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(FieldsModel)
    private fieldsRepository: typeof FieldsModel,
    @InjectModel(FieldsTypesModel)
    private fieldsTypesRepository: typeof FieldsTypesModel,
  ) {}

  async createField(dto: CreateFieldDto) {
    const field = await this.fieldsRepository.create(dto);
    return field;
  }

  async createFieldsType(dto: CreateFieldsTypeDto) {
    const type = await this.fieldsTypesRepository.create(dto);
    return type;
  }
}
