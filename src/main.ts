declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from 'src/common/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置跨域
  app.enableCors();
  app.useGlobalInterceptors(new Response());
  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .addTag('Your Tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 启用 Swagger UI
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(5000);
  // 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
