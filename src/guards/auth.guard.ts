
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException, Inject, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request, Response } from 'express';
import { NotFoundError, Observable } from 'rxjs';
import { AUTH_SERVICE_CONSTANT, JWT_SECRET, USER_SERVICE_CONSTANT } from 'src/constants';
import { AuthService } from 'src/modules/core/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_CONSTANT)
    private authService: AuthService,
    @Inject(USER_SERVICE_CONSTANT)
    private userService: UserService,
    @Inject(CACHE_MANAGER)
    private cacheService: Cache

  ){}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if(!token) throw new BadRequestException("Bad token format");

    const payload = this.authService.verifyToken(JWT_SECRET, token);

    if( !payload ) throw new UnauthorizedException("Invalid token");

    let USER_IS_CACHED = true;

    let user = await this.cacheService.get<any>(payload.id);

    if(!user){

      user = await this.userService.findUserbyId(payload.id);

      USER_IS_CACHED = false;

      if( !user ) throw new NotFoundException('User not found');

      await this.cacheService.set( payload.id, JSON.stringify(user), 1800);

    } 

    if(!user) throw new NotFoundException('User not found');

    user = USER_IS_CACHED ? JSON.parse(user) : user;

    request.userId = payload.id;

    request.user = user;

    return Promise.resolve(true);

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
