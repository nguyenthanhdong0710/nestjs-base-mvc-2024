import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { create } from 'express-handlebars';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const hbs = create({ extname: 'hbs' });
  app.engine('hbs', hbs.engine);
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
