import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BeehiivApi implements ICredentialType {
	name = 'beehiivApi';

	displayName = 'Beehiiv API';

	documentationUrl = 'https://github.com/jdbohrman/n8n-nodes-beehiiv/';

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
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.beehiiv.com/v2',
			url: `/publications`,
			method: 'GET',
		},
	};
}
