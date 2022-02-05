import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { CreateTermDto } from './dto/create-term.dto';
import { TaxonomyModel } from './taxonomy.model';
import { TermModel } from './term.model';

@Injectable()
export class TaxonomyService {

    constructor(
        @InjectModel(TaxonomyModel)
        private taxonomyRepository: typeof TaxonomyModel,
        @InjectModel(TermModel)
        private termRepository: typeof TermModel
    ) {}

    async getTaxonomies() {
        const taxonomies = await this.taxonomyRepository.findAll({
            include: {
                model: TermModel,
            },
        });
        return taxonomies;
    }

    async createTaxonomy(dto: CreateTaxonomyDto) {
        const taxonomy = await this.taxonomyRepository.create(dto);
        return taxonomy;
    }

    async createTerm(dto: CreateTermDto) {
        const term = await this.termRepository.create(dto);
        return term;
    }
}
