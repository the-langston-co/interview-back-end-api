import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

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
  async seed() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      console.log('Seeding database...');
      await this.createUsers();
      console.log('Seeding complete!');
    } else {
      console.log('Database already seeded!');
    }
  }

  private async createUsers() {
    const users = [
      { username: 'admin', password: 'password', role: 'admin' },
      { username: 'user1', password: 'password', role: 'user' },
      { username: 'user2', password: 'password', role: 'user' },
    ];
    await this.userRepository.save(users); // Bulk-insert seed data
  }
}
