import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path/posix';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './controller/video.controller';
import { VideoService } from './service/video.service';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { Video, VideoStream } from './model/video.schema';
import { User, UserSchema } from './model/user.schema';

import { secret } from './utils/constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Video.name, schema: VideoSchema}]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        },
      })
    }),
    JwtModule.register({
      secret,
      signOptions: {expiresIn: '2h'},
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [
    AppController,
    VideoController,
    UserController,
  ],
  providers: [
    AppService,
    VideoService,
    UserService
  ],
})
export class AppModule {}
