import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {MenusModel} from "./menus.model";
import MenuItemsModel from "./menu-items.model";

@Module({
  controllers: [MenusController],
  providers: [MenusService],
  imports: [
      SequelizeModule.forFeature([
          MenusModel,
          MenuItemsModel
      ])
  ]
})
export class MenusModule {}
