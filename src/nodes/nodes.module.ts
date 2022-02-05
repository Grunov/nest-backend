import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NodesModel } from './nodes.model';
import { NodeTypesModel } from './node-types.model';

@Module({
  providers: [NodesService],
  controllers: [NodesController],
  imports: [
    SequelizeModule.forFeature([
      NodesModel,
      NodeTypesModel
    ])
  ],
  exports: [NodesService]
})
export class NodesModule {}
