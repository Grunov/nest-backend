import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel)
    private postsRepository: typeof PostModel,
    private filesServise: FilesService,
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.filesServise.createFile(image);
    const post = await this.postsRepository.create({ ...dto, image: fileName });
    return post;
  }
}
