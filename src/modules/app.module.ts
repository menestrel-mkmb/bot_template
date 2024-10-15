import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  BitFieldResolvable,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
} from 'discord.js';
import { NecordModule } from 'necord';

import { CommonModule } from './common';
import { DiscordModule } from './discord/discord.module';
import { DiscordService } from './discord/discord.service';
import { PassengerModule } from './passenger/passenger.module';

const intentsObj = [
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.DirectMessages
] as BitFieldResolvable<GatewayIntentsString,number>;
const intentsObjForDev = Object.keys(
  IntentsBitField.Flags
) as BitFieldResolvable<GatewayIntentsString,number>;
const partialsObj = [
  Partials.Channel,
  Partials.GuildMember,
  Partials.GuildScheduledEvent,
  Partials.Message,
  Partials.Reaction,
  Partials.User,
  Partials.ThreadMember,
];

@Module({
    imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true
        }),
        CommonModule,
        DiscordModule,
        PassengerModule,
        NecordModule.forRoot({
            token:  process.env.DISCORD_BOT_TOKEN || '',
            intents: process.env.NODE_ENV === 'development' ? intentsObjForDev : intentsObj,
            partials: partialsObj,
          }),
    ],
    providers: [DiscordService],
    exports: [DiscordService],
})
export class ApplicationModule {}
