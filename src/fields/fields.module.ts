import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FieldsModel } from './fields.model';
import { FieldsTypesModel } from './fields-types.model';

@Module({
  providers: [FieldsService],
  controllers: [FieldsController],
  imports: [SequelizeModule.forFeature([FieldsModel, FieldsTypesModel])],
  exports: [FieldsService],
})
export class FieldsModule {}
