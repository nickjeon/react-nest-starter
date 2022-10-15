import { JwtService } from '@nestjs/jwt';
import {
    Injectable,
    NestMiddleware,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {
    Request,
    Response,
    NextFunction,
} from 'express';
import { UserService } from './service/user.service';

interface UserRequest extends Request {
    user: any
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
    constructor(private readonly jwt: JwtService, private readonly userService: UserService) {}
}