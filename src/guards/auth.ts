
import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { AUTH_SERVICE_CONSTANT, JWT_SECRET } from 'src/constants';
import { AuthService } from 'src/modules/core/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE_CONSTANT)
    private authService: AuthService,

  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    console.log(token)

    if(!token) throw new BadRequestException("Bad token format");

    const payload = this.authService.verifyToken(JWT_SECRET, token);

    console.log( payload )
    if( !payload ) throw new UnauthorizedException("Invalid token")

    request.userId = payload.id

    return true;

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
