
import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import JoiValidationPipe from 'src/pipes/';
import { UserAuthValidator } from 'src/pipes/validators/user';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
// @UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  @UsePipes(new JoiValidationPipe(UserAuthValidator))
  async signup(@Body() body): Promise<any> {

    const response = await this.userService.signUp(body);

    return {
      response,
    };

  }

  @Post('/login')
  @UsePipes(new JoiValidationPipe(UserAuthValidator))
  async login(@Body() body): Promise<any> {

    const response = await this.userService.login(body);

    return {
      response,
    };

  }

  @UseGuards(AuthGuard)
  @Get('/')
  async profile(@Req() req) {

    const user = req.user;

    user.password = undefined;

    return { user };

  }

}
