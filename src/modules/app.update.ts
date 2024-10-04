import { Injectable, Logger } from '@nestjs/common';
import { Context, On, Once, ContextOf } from 'necord';

@Injectable()
export class AppUpdate {
  private readonly logger = new Logger(AppUpdate.name);

  @Once('ready')
  public onReady(@Context() [c]: ContextOf<'ready'>) {
    this.logger.log(`Logged in as ${c.user.tag}!`);
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
