import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // This method runs automatically when the app starts
  async onModuleInit() {
    await this.seed();
  }

  async resetDatabase() {
    this.logger.debug('Resetting database...');
    await this.reset();
    await this.seed();
  }

  // Seed logic: populate the database with data
  async seed(attempt: number = 0) {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      this.logger.debug('Seeding database...');
      await this.createUsers();
      this.logger.debug('Seeding complete!');
    } else if (attempt < 1) {
      this.logger.debug('Database already seeded!');
    }
  }

  async reset() {
    await this.userRepository.manager.query('DELETE from task;');
    await this.userRepository.manager.query('DELETE from user;');
  }

  private async createUsers() {
    async function generatePassword(password: string) {
      return await bcrypt.hash(password, 10);
    }
    const defaultPassword = await generatePassword('password');

    const users = [
      {
        username: 'admin',
        password: defaultPassword,
        role: 'admin',
      },
      {
        username: 'user1',
        password: defaultPassword,
        role: 'user',
      },
      {
        username: 'user2',
        password: defaultPassword,
        role: 'user',
      },
    ];
    await this.userRepository.save(users); // Bulk-insert seed data
  }
}
