import type { FastifyRequest, FastifyReply } from 'fastify';
import type { StarBody } from '#types/interfaces';
import type { WebhookClient } from 'discord.js';
import { createEmbed } from '#utils/util';

export default {
	name: 'star',
	run: (req: FastifyRequest, res: FastifyReply, client: WebhookClient) => {
		const { action, repository, sender } = req.body as StarBody;
		const author = { name: sender.login, iconURL: sender.avatar_url, url: sender.html_url };

		if (action === 'created') {
			const embed = createEmbed(author).setTitle(`[${repository.full_name}] New star added`).setURL(repository.html_url).setColor('DARK_GREEN');

			return client.send({ embeds: [embed] });
		} else if (action === 'deleted') {
			const embed = createEmbed(author).setTitle(`[${repository.full_name}] Star removed`).setURL(repository.html_url).setColor('RED');

			return client.send({ embeds: [embed] });
		}

		return res.status(204);
	}
};
