import type { Event } from './interfaces/Event';

declare module 'discord.js' {
	interface WebhookClient {
		events: Map<string, Event>;
	}
}
