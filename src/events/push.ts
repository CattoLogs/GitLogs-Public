import type { FastifyReply, FastifyRequest } from 'fastify';
import type { WebhookClient } from 'discord.js';
import type { PushEvent } from '#types/interfaces';
import { createEmbed } from '#utils/util';

export default {
	name: 'push',
	run: (req: FastifyRequest, res: FastifyReply, client: WebhookClient) => {
		const { ref, repository, sender, compare, commits } = req.body as PushEvent;
		const author = { name: sender.login, iconURL: sender.avatar_url, url: sender.html_url };

		const branch = ref.split('/').pop();
		const sliced = commits.slice(0, 8);

		const embed = createEmbed(author)
			.setTitle(`[${repository.full_name}:${branch}] ${commits.length} new ${commits.length === 1 ? 'commit' : 'commits'}`)
			.setDescription(
				sliced
					.map(
						(commit) =>
							// TODO: fix markdown issues next line
							`\`[${commit.id.slice(0, 7)}](${commit.url})\` ${
								commit.message.length > 50 ? `${commit.message.slice(0, 50)}...` : commit.message
							} - ${commit.author.name}`
					)
					.join('\n')
			)
			.setColor('DARK_GREEN')
			.setURL(compare);

		client.send({ embeds: [embed] });
		return res.status(204);
	}
};
