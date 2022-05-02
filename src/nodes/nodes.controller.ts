import { Body, Controller, Post } from '@nestjs/common';
import { CreateNodeTypeDto } from './dto/create-node-type.dto';
import { CreateNodeDto } from './dto/create-node.dto';
import { NodesService } from './nodes.service';

@Controller('nodes')
export class NodesController {
  constructor(private nodesService: NodesService) {}

  @Post('/create')
  createNode(@Body() dto: CreateNodeDto) {
    return this.nodesService.createNode(dto);
  }

  @Post('/type/create')
  createType(@Body() dto: CreateNodeTypeDto) {
    return this.nodesService.createType(dto);
  }
}
