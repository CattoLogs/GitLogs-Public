import type { User, Repository } from '.';

export interface IssueEvent {
	action: 'opened';
	issue: {
		title: string;
		html_url: string;
		user: User;
		body: string;
		number: number;
	};
	repository: Repository;
}

export interface IssueCommentEvent extends Omit<IssueEvent, 'action'> {
	action: 'created';
	comment: {
		html_url: string;
		user: User;
	};
}
