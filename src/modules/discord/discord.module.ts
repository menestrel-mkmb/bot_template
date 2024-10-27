import { Module } from '@nestjs/common';

import {
  BitFieldResolvable,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
} from 'discord.js';
import { NecordModule } from 'necord';

import { DiscordCommands } from './provider/discord.commands';

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
    NecordModule.forRoot({
            token:  process.env.DISCORD_BOT_TOKEN || '',
            intents: process.env.NODE_ENV === 'development' ? intentsObjForDev : intentsObj,
            partials: partialsObj,
          })],
  controllers: [],
  providers: [DiscordCommands],
  exports: [DiscordCommands],
})
export class DiscordModule {}
