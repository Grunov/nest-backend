import { Module } from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';
import { TaxonomyController } from './taxonomy.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaxonomyModel } from './taxonomy.model';
import { TermModel } from './term.model';

@Module({
  providers: [TaxonomyService],
  controllers: [TaxonomyController],
  imports: [SequelizeModule.forFeature([TaxonomyModel, TermModel])],
  exports: [TaxonomyService],
})
export class TaxonomyModule {}
