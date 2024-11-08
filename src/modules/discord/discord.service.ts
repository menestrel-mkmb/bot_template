import { Injectable } from "@nestjs/common";
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class DiscordService {
    @SlashCommand({
        name: 'hello',
        description: 'Hello from a nest application',
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return interaction.reply({ content: 'from nest.js via template with necord!' });
    }
}