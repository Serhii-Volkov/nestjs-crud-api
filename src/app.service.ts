import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  create(title: string) {
    return `App title: ${title}`
  }

  getProfile(userAgent) {
    return {
      id: 1,
      name: 'Serhii',
      email: "serhii@example.com",
      userAgent
    }
  }
}
