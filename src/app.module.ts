import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { RoleModel } from './roles/roles.model';
import { UserRolesModel } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TaxonomyModule } from './taxonomy/taxonomy.module';
import { TaxonomyModel } from './taxonomy/taxonomy.model';
import { TermModel } from './taxonomy/term.model';
import { NodesModule } from './nodes/nodes.module';
import { NodesModel } from './nodes/nodes.model';
import { NodeTypesModel } from './nodes/node-types.model';
import { FieldsModule } from './fields/fields.module';
import { FieldsModel } from './fields/fields.model';
import { FieldsTypesModel } from './fields/fields-types.model';
import { MenusModule } from './menu/menus.module';
import {MenusModel} from "./menu/menus.model";
import { ProfilesModule } from './profiles/profiles.module';
import MenuItemsModel from "./menu/menu-items.model";
import ProfilesModel from './profiles/profiles.models';
import TokensModel from './auth/tokens.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        UserModel,
        RoleModel,
        UserRolesModel,
        TaxonomyModel,
        TermModel,
        NodesModel,
        NodeTypesModel,
        FieldsModel,
        FieldsTypesModel,
        MenusModel,
        MenuItemsModel,
        ProfilesModel,
        TokensModel
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    TaxonomyModule,
    NodesModule,
    FieldsModule,
    MenusModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
