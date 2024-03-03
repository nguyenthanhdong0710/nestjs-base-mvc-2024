import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import { Roles } from './common/decorators/roles.decorator';
import { EUserRole } from './users/users.model';
import { RolesGuard } from './common/guards/roles.guard';

@Controller()
@UseFilters(AuthExceptionFilter)
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello-world')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  helloWorld(@Res() res: Response) {
    res.redirect('/login');
  }

  @Get('/login')
  @Render('login/index')
  login(@Request() req, @Res() res: Response) {
    console.log(req.user);
    if (req.user) return res.redirect(`/dashboard`);
    return '';
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  loginPost(@Res() res: Response) {
    return res.redirect('/dashboard');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/dashboard')
  @Render('dashboard/index')
  dashboard(@Request() req) {
    return { message: `Hello any role ${req.user.username}` };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/dashboard/sa')
  @Render('dashboard/index')
  @Roles([EUserRole.SUPER_ADMIN])
  dashboardSuperAdmin(@Request() req) {
    return { message: `Hello SUPER ADMIN ${req.user.username}` };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/dashboard/a')
  @Render('dashboard/index')
  @Roles([EUserRole.ADMIN])
  dashboardAdmin(@Request() req) {
    return { message: `Hello ADMIN ${req.user.username}` };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/dashboard/u')
  @Render('dashboard/index')
  @Roles([EUserRole.USER])
  dashboardUser(@Request() req) {
    return { message: `Hello ADMIN ${req.user.username}` };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }

  @Get('*')
  @Render('404')
  getNotFoundPage(): string {
    return;
  }
}
