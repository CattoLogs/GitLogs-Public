import type { Repository, User } from '.';

export interface PushEvent {
	ref: string;
	repository: Repository;
	sender: User;
	compare: string;
	commits: Commit[];
}

interface Commit {
	id: string;
	message: string;
	url: string;
	author: {
		name: string;
	};
}
