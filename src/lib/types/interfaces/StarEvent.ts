import type { Repository, User } from '.';

export interface StarBody {
	action: 'created' | 'deleted';
	repository: Repository;
	sender: User;
}
