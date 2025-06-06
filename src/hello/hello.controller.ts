import { Controller, Get, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get('sync')
  getSyncHello(@Query('name') name: string) {
    return this.helloService.syncHello(name || 'world');
  }

  @Get('async')
  async getAsyncHello(@Query('name') name: string) {
    return await this.helloService.asyncHello(name || 'world');
  }
}
