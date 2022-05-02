import {Body, Query, Controller, Get, Post} from '@nestjs/common';
import CreateMenuDto from "./dto/create-menu.dto";
import {MenusService} from "./menus.service";
import CreateMenuItemDto from "./dto/create-menu-item.dto";

@Controller('menus')
export class MenusController {

    constructor(private menusService: MenusService) {}

    @Get('/')
    getMenus() {
        return this.menusService.getMenus();
    }

    @Get('/get')
    getByName(@Query('name') name: string)  {
        return this.menusService.getMenuByName(name);
    }

    @Post('/create')
    createMenu(@Body() dto: CreateMenuDto) {
        return this.menusService.createMenu(dto);
    }

    @Post('/item/create')
    createMenuIitem(@Body() dto: CreateMenuItemDto) {
        return this.menusService.createMenuItem(dto);
    }
}
