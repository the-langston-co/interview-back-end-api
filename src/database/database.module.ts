import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite', // Configure your DB type here
        database: 'database.sqlite',
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Globally load all entities
        synchronize: true, // Auto-sync entities with DB schema in dev environments
        autoLoadEntities: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
