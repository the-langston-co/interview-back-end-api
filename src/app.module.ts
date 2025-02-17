import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { SeedModule } from './seed/seed.module';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './profile/profile.module';
import { ClsModule, ClsService } from 'nestjs-cls';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls: ClsService, req: Request) => {
          cls.set('req_start', new Date());
          cls.set('req_url', req.url);
        },
      },
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    TasksModule,
    SeedModule,
    ProfileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  exports: [DatabaseModule],
})
export class AppModule {}
