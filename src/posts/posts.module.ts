import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/users/users.model';
import { PostModel } from './posts.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([UserModel, PostModel]),
    FilesModule,
  ],
})
export class PostsModule {}
