import {
  Catch,
  ExceptionFilter,
  // Logger
} from '@nestjs/common';
import { DiscordAPIError } from 'discord.js';

@Catch(DiscordAPIError)
export class DiscordExceptionFilter implements ExceptionFilter {
    // private readonly logger = new Logger(DiscordExceptionFilter.name);
  public catch(error: DiscordAPIError) {
    // this.logger.error(error);

    return new Error(`Discord API Error: ${error.message}`);
  }
}
