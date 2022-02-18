export interface StarBody {
	action: 'created' | 'deleted';
	repository: {
		name: string;
		full_name: string;
		html_url: string;
	};
	sender: {
		login: string;
		avatar_url: string;
		html_url: string;
	};
}
