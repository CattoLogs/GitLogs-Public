process.env.NODE_ENV ??= 'development';

import { config } from 'dotenv-cra';
import { createColors } from 'colorette';
import { srcDir, distDir } from '#utils/constants';
import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import type { FastifyInstance } from 'fastify';
import type { WebhookClient } from 'discord.js';
import type { Event } from '#types/interfaces';

config({ path: join(srcDir, '.env') });
createColors({ useColor: true });

export async function setupEvents(app: FastifyInstance, client: WebhookClient) {
	client.events = new Map<string, Event>();

	const dir = join(distDir, 'events');
	const files = readdirSync(dir);

	for (const file of files) {
		let { default: listener } = await import(join(dir, file));
		client.events.set(listener.name, listener as Event);
		app.log.info(`Loaded event ${file}`);
	}
}
