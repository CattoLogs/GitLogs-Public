import { MessageEmbed, type MessageEmbedOptions } from 'discord.js';
import { createHmac, timingSafeEqual } from 'node:crypto';

export function createEmbed(author?: { name: string; iconURL?: string; url?: string }, data?: MessageEmbedOptions): MessageEmbed {
	return new MessageEmbed(data).setColor('RANDOM').setAuthor(author ?? null);
}

export function isValidPayload(signature: string, body: unknown): boolean {
	const hmac = createHmac('sha1', process.env.GITHUB_SECRET!);
	const comparisonSignature = `sha1=${hmac.update(JSON.stringify(body)).digest('hex')}`;

	return timingSafeEqual(Buffer.from(signature), Buffer.from(comparisonSignature));
}
