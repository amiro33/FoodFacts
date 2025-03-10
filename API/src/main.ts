import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { execSync } from 'node:child_process';
function getLastCommitDate(): string {
  try {
    // Run git log command to get the latest commit date
    const commitDate = execSync('git log -1 --format=%cd').toString().trim();
    return commitDate;
  } catch (error) {
    console.error('Error fetching commit date:', error);
    return 'Unknown';
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('FoodFacts API')
    .setVersion(`LATEST COMMIT: ${getLastCommitDate()}`)
    .setDescription(
      'Gets data from the USDA FoodDataCentral API. Note: for APIs that require auth, you must login with the login functions and then pass the JWT as an auth header like: `Authorization: Bearer xxxxxx`',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
