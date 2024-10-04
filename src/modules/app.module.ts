import { Module, UseFilters } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  BitFieldResolvable,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
} from 'discord.js';
import { NecordModule } from 'necord';

import { DiscordExceptionFilter } from './app.exception';
import { AppService } from './app.service';
import { AppUpdate } from './app.update';

import { CommonModule } from './common';
import { PassengerModule } from './passenger/passenger.module';

const intentsObj = [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.DirectMessages] as BitFieldResolvable<GatewayIntentsString,number>;
const intentsObjForDev = Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString,number>;
const partialsObj = [
  Partials.Channel,
  Partials.GuildMember,
  Partials.GuildScheduledEvent,
  Partials.Message,
  Partials.Reaction,
  Partials.User,
  Partials.ThreadMember,
];

@UseFilters(DiscordExceptionFilter)
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
            intents: process.env.NODE_ENV === 'development' ? intentsObjForDev : intentsObj,
            partials: partialsObj,
          }),
    ],
    providers: [AppService, AppUpdate],
    exports: [AppService],
})
export class ApplicationModule {}
