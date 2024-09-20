import { Injectable, Logger } from '@nestjs/common';
import { Client, Partials } from 'discord.js';
import { Context, On, Once, ContextOf } from 'necord';

@Injectable()
export class AppUpdate {
  private readonly logger = new Logger(AppUpdate.name);
  private readonly client: Client = new Client({
    intents: ['Guilds', 'GuildMessages', 'DirectMessages'],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User],
  });

  @Once('ready')
  public async onReady(@Context() [c]: ContextOf<'ready'>) {
    await this.client.login(process.env.BOT_TOKEN)
      .then(() => {
        this.logger.log(`Bot logged in as ${c.user.username}`);
      })
      .catch((err) => {
        this.logger.error(`Log com undefined request: ${err}`);
      });
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
