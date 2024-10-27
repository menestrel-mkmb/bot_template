import { Module } from '@nestjs/common';
import { DiscordCommands } from './provider/discord.commands';

@Module({
  imports: [],
  controllers: [],
  providers: [DiscordCommands],
  exports: [DiscordCommands],
})
export class DiscordModule {}
