import { createEmbed } from '#utils/util';
import type { WebhookClient } from 'discord.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { IssueEvent } from '#types/interfaces';

export default {
	name: 'issues',
	run: (req: FastifyRequest, res: FastifyReply, client: WebhookClient) => {
		const { action, issue, repository } = req.body as IssueEvent;
		const author = { name: issue.user.login, iconURL: issue.user.avatar_url, url: issue.user.html_url };

		if (action === 'opened') {
			const embed = createEmbed(author)
				.setTitle(`[${repository.full_name}] Issue Opened: #${repository.open_issues} ${issue.title}`)
				.setColor('DARK_GREEN')
				.setURL(issue.html_url);

			if (issue.body) embed.setDescription(issue.body);
			return client.send({ embeds: [embed] });
		} else if (action === 'closed') {
			const embed = createEmbed(author)
				.setTitle(`[${repository.full_name}] Issue Closed: #${repository.open_issues} ${issue.title}`)
				.setColor('RED')
				.setURL(issue.html_url);

			return client.send({ embeds: [embed] });
		} else if (action === 'reopened') {
			const embed = createEmbed(author)
				.setTitle(`[${repository.full_name}] Issue Reopened: #${repository.open_issues} ${issue.title}`)
				.setColor('DARK_GREEN')
				.setURL(issue.html_url);

			return client.send({ embeds: [embed] });
		}

		return res.send(204);
	}
};
