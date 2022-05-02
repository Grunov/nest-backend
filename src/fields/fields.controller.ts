import { Body, Controller, Post } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { CreateFieldsTypeDto } from './dto/create-fields-type.dto';
import { FieldsService } from './fields.service';

@Controller('fields')
export class FieldsController {
  constructor(private fieldsService: FieldsService) {}

  @Post('/create')
  createField(@Body() dto: CreateFieldDto) {
    return this.fieldsService.createField(dto);
  }

  @Post('/type/create')
  createFieldType(@Body() dto: CreateFieldsTypeDto) {
    return this.fieldsService.createFieldsType(dto);
  }
}
