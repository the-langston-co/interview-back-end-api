import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // This method runs automatically when the app starts
  // async onModuleInit() {
  //   await this.seed();
  // }

  // Seed logic: populate the database with data
  async seed(attempt: number = 0) {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      console.log('Seeding database...');
      await this.createUsers();
      console.log('Seeding complete!');
    } else if (attempt < 1) {
      console.log('Database already seeded...resetting database');
      await this.reset();
      await this.seed(attempt + 1);
    } else {
      console.log('Database already seeded and failed to reset...exiting');
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
