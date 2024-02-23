
import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import JoiValidationPipe from 'src/pipes';
import { UserAuthValidator } from 'src/pipes/validators/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private userService: UserService
  ){}

  @Post('/')
  @UsePipes(new JoiValidationPipe(UserAuthValidator))
  async signup( @Body() body ): Promise<any> {

    const token = await this.userService.signUp(body);

    return {
        token
    }

  }
  
  @Post('/login')
  @UsePipes(new JoiValidationPipe(UserAuthValidator))
  async login( @Body() body ): Promise<any> {

    const token = await this.userService.login(body);

    return {
        token
    }

  }
}
