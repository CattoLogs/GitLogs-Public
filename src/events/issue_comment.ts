import type { FastifyRequest, FastifyReply } from 'fastify';
import type { WebhookClient } from 'discord.js';
import type { IssueCommentEvent } from '#types/interfaces';
import { createEmbed } from '#utils/util';

export default {
	name: 'issue_comment',
	run: (req: FastifyRequest, res: FastifyReply, client: WebhookClient) => {
		const { action, issue, comment, repository } = req.body as IssueCommentEvent;
		if (action === 'created') {
			const author = { name: comment.user.login, iconURL: comment.user.avatar_url, url: comment.user.html_url };
			const embed = createEmbed(author)
				.setTitle(`[${repository.full_name}] New Comment on Issue: #${issue.number} ${issue.title}`)
				.setDescription(issue.title)
				.setColor('DARK_GREEN')
				.setURL(issue.html_url);

			return client.send({ embeds: [embed] });
		}

		return res.status(204);
	}
};
