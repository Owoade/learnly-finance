import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as morgan from "morgan";
import { AppModule } from './app.module';
import * as Sentry from "@sentry/node";
import { SentryFilter } from './exception-filters';
import { SENTRY_DSN } from './constants';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(morgan('tiny'));

  if( SENTRY_DSN ){

    Sentry.init({
      dsn: SENTRY_DSN,
    });
  
    const { httpAdapter } = app.get(HttpAdapterHost);
  
    app.useGlobalFilters(new SentryFilter(httpAdapter));

  }

  await app.listen( process.env.PORT ?? 5000);

}
bootstrap();
