import type { FastifyReply, FastifyRequest } from 'fastify';
import type { WebhookClient } from 'discord.js';

export interface Event {
	name: string;
	run: (req: FastifyRequest, res: FastifyReply, client: WebhookClient) => void;
}
