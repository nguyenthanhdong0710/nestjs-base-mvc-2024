import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { create } from 'express-handlebars';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const hbs = create({ extname: 'hbs', defaultLayout: 'main' });
  app.engine('hbs', hbs.engine);
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'nest-mvc',
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: true,
        httpOnly: false,
        maxAge: 1000 * 60 * 60, // 1h
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
