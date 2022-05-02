import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {MenusModel} from "./menus.model";
import CreateMenuDto from "./dto/create-menu.dto";
import MenuItemsModel from "./menu-items.model";
import CreateMenuItemDto from "./dto/create-menu-item.dto";

@Injectable()
export class MenusService {
    constructor(
        @InjectModel(MenusModel)
        private menusRepository: typeof MenusModel,
        @InjectModel(MenuItemsModel)
        private menuItemsRepository: typeof MenuItemsModel
    ) {}

    async createMenu(dto: CreateMenuDto) {
        const menu = await this.menusRepository.create(dto);
        return menu;
    }

    async getMenus() {
        const menus = await this.menusRepository.findAll({
            include: {
              model: MenuItemsModel
            }
        });
        return menus;
    }

    async getMenuByName(name: string) {
        const menu = await this.menusRepository.findOne({
            where: { name },
            include: {
                model: MenuItemsModel
            }
        });
        if(menu) {
            return menu;
        }
        throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);
    }

    async createMenuItem(dto: CreateMenuItemDto) {
        const item = await this.menuItemsRepository.create(dto);
        return item;
    }

}
