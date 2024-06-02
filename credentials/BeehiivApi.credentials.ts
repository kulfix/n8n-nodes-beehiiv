import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BeehiivApi implements ICredentialType {
	name = 'BeehiivApi';

	displayName = 'Beehiiv API';

	documentationUrl = 'Beehiiv';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
        {
			displayName: 'Publication ID',
			name: 'publicationId',
			type: 'string',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.beehiiv.com/v2',
			url: `/publications`,
		},
	};
}
