import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import CreateProfileDto from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {

    constructor(private profilesService: ProfilesService) {}

    @Get()
    getAllProfiles() {
        return this.profilesService.getAllProfiles();
    }

    @Get('/get')
    getProfileById(@Query('id') id: string) {
        return this.profilesService.getProfileById(id);
    }

    @Post('/create')
    createProfile(@Body() dto: CreateProfileDto) {
        return this.profilesService.createProfile(dto);
    }
}
