import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { CreateTermDto } from './dto/create-term.dto';
import { TaxonomyService } from './taxonomy.service';

@Controller('taxonomy')
export class TaxonomyController {
  constructor(private taxonomyService: TaxonomyService) {}

  @Get('/get-all')
  getTaxonomies() {
    return this.taxonomyService.getTaxonomies();
  }

  @Post('/create')
  createTaxonomy(@Body() taxonomyDto: CreateTaxonomyDto) {
    return this.taxonomyService.createTaxonomy(taxonomyDto);
  }

  @Post('/term/create')
  createTerm(@Body() termDto: CreateTermDto) {
    return this.taxonomyService.createTerm(termDto);
  }
}
