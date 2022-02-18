import { MessageEmbed, type MessageEmbedOptions } from 'discord.js';

export function createEmbed(author?: { name: string; iconURL?: string; url?: string }, data?: MessageEmbedOptions) {
	return new MessageEmbed(data).setColor('RANDOM').setAuthor(author ?? null);
}
