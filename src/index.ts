import '#lib/setup';

import { WebhookClient } from 'discord.js';
import fastify from 'fastify';
import { setupEvents } from '#lib/setup';

const client = new WebhookClient({ url: process.env.WEBHOOK_URL! });

const app = fastify({
	logger: {
		prettyPrint: {
			ignore: 'pid,hostname,req,reqid'
		},
		level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
	}
});

setupEvents(app, client);

app.post('/github', async (req, res) => {
	const githubEvent = req.headers['x-github-event'];
	const responseHeaders = { 'x-powered-by': 'CattoLogs', 'user-agent': 'CattoLogs https://github.com/CattoLogs/GitLogs-Public' };

	try {
		const event = client.events.get(githubEvent as string);
		if (event) {
			event.run(req, res, client);
		}

		return res.headers(responseHeaders).status(404);
	} catch (err) {
		return res
			.headers(responseHeaders)
			.status(500)
			.send({
				err: (err as Error).message
			});
	}
});

app.listen(Number(process.env.PORT!));
