import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  // BitFieldResolvable,
  // GatewayIntentsString,
  // IntentsBitField,
  Partials,
} from 'discord.js';
import { NecordModule } from 'necord';

import { DiscordExceptionFilter } from './app.exception';
import { AppService } from './app.service';
import { AppUpdate } from './app.update';

import { CommonModule } from './common';
import { PassengerModule } from './passenger/passenger.module';


@Module({
    imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true
        }),
        CommonModule,
        PassengerModule,
        NecordModule.forRoot({
            token: process.env.DISCORD_BOT_TOKEN || '',
            intents: ['Guilds', 'GuildMessages', 'DirectMessages'],
            // intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
            //   GatewayIntentsString,
            //   number
            // >,
            partials: [
              Partials.Channel,
              Partials.GuildMember,
              Partials.GuildScheduledEvent,
              Partials.Message,
              Partials.Reaction,
              Partials.User,
              Partials.ThreadMember,
            ],
          }),
    ],
    providers: [AppService, AppUpdate, DiscordExceptionFilter],
    exports: [AppService],
})
export class ApplicationModule {}
