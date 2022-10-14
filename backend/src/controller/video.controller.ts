import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    UseInterceptors,
    UploadFiles,
    Put,
    Req,
    Res,
    Query,
} from '@nestjs/common';
import { Video } from '../model/video.schema';
import { VideoService } from '../video.service';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('/api/v1/video')
export class VideoController {
    constructor(private readonly VideoService: VideoService) {}
}