import { Module } from '@nestjs/common';
import { DiscordService } from './provider/discord.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
