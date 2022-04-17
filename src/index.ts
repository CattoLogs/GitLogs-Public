import '#lib/setup';

import { WebhookClient } from 'discord.js';
import fastify from 'fastify';
import { setupEvents } from '#lib/setup';
import { isValidPayload } from '#utils/util';

const client = new WebhookClient({ url: process.env.WEBHOOK_URL! });

const app = fastify({
	logger: {
		prettyPrint: {
			ignore: 'pid,hostname,req,reqId'
		},
		level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
	}
});

setupEvents(app, client);

app.post('/github', async (req, res) => {
	const githubEvent = req.headers['x-github-event'];
	const responseHeaders = { 'x-powered-by': 'CattoLogs', 'user-agent': 'CattoLogs https://github.com/CattoLogs/GitLogs-Public' };

	if (Boolean(process.env.DEBUG)) app.log.info(`Recieved event ${githubEvent}, action ${(req.body as any).action}`);

	try {
		const event = client.events.get(githubEvent as string);

		if (event) {
			if (process.env.GITHUB_SECRET && isValidPayload(req.headers['x-hub-signature'] as string, req.body)) {
				event.run(req, res, client);
			} else {
				return res.headers(responseHeaders).status(403).send('Invalid signatures.');
			}
		}

		return res.headers(responseHeaders).status(404).send('Could not find event');
	} catch (err) {
		console.log(err);
		return res
			.headers(responseHeaders)
			.status(500)
			.send({
				err: (err as Error).message
			});
	}
});

app.listen(Number(process.env.PORT!));
