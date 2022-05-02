import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CreateProfileDto from './dto/create-profile.dto';
import ProfilesModel from './profiles.models';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectModel(ProfilesModel) 
        private profilesRepository: typeof ProfilesModel
    ) {}

    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profilesRepository.create(dto);
        return profile;
    }

    async getAllProfiles() {
        const profiles = await this.profilesRepository.findAll();
        return profiles;
    }

    async getProfileById(id: string) {
        const profile = await this.profilesRepository.findByPk(id);
        return profile;
    }
}
