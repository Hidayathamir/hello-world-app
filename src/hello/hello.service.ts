import { Injectable } from '@nestjs/common';
import { LogMethods } from 'src/common/log-methods.decorator';

@LogMethods()
@Injectable()
export class HelloService {
  syncHello(name: string): { message: string } {
    const message = this.getSyncHelloMsg(name);
    return { message };
  }

  getSyncHelloMsg(name: string): string {
    return `hello ${name}`;
  }

  async asyncHello(name: string): Promise<{ message: string }> {
    const message = await this.getAsyncHelloMsg(name);
    return { message };
  }

  async getAsyncHelloMsg(name: string): Promise<string> {
    return `hello ${name}`;
  }
}
