import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNodeTypeDto } from './dto/create-node-type.dto';
import { CreateNodeDto } from './dto/create-node.dto';
import { NodeTypesModel } from './node-types.model';
import { NodesModel } from './nodes.model';

@Injectable()
export class NodesService {

    constructor(
        @InjectModel(NodesModel) 
        private nodeRepository: typeof NodesModel,
        @InjectModel(NodeTypesModel) 
        private nodeTypesRepository: typeof NodeTypesModel
    ) {}

    async createNode(dto: CreateNodeDto) {
        const node = await this.nodeRepository.create(dto);
        return node;
    }

    async createType(dto: CreateNodeTypeDto) {
        const nodeType = await this.nodeTypesRepository.create(dto);
        return nodeType;
    }
}
