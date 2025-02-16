import { NestFactory } from '@nestjs/core';
import { SeedService } from '../seed/seed.service';
import { AppModule } from '../app.module';

async function bootstrap() {
  try {
    console.log('Starting seeding process...');
    const app = await NestFactory.createApplicationContext(AppModule);

    const seedService = app.get(SeedService);
    await seedService.seed();

    console.log('Seeding complete!');
    await app.close();
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1); // Exit with non-zero status code to indicate failure
  }
}

bootstrap();
