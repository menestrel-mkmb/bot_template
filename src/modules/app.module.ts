import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common';

import { DiscordModule } from './discord/discord.module';

import { PassengerModule } from './passenger/passenger.module';


@Module({
    imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true
        }),
        CommonModule,
        DiscordModule,
        PassengerModule,
    ],
    providers: [],
    exports: [],
})
export class ApplicationModule {}
