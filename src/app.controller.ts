import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @Render('index')
  helloWorld() {
    return { message: 'Hello world!' };
  }

  @Get('/login')
  @Render('login/index')
  login() {
    return '';
  }

  @Post('/login')
  @Render('dashboard/index')
  dashboard(@Body() formData: any) {
    return { message: `Hello ${formData.username}` };
  }
}
