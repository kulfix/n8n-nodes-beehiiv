import type { INodeProperties } from 'n8n-workflow';

export const referralOperations: INodeProperties[] = [
    {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['referral_program'],
			},
		},
        options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get the referrals for a subscription',
				action: 'Get a list of referrals',
			},
        ],
        default: 'get',
	},
];

export const referralFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                tag:create/update                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		placeholder: '10',
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['referral_program'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
    {
		displayName: 'Page',
		name: 'page',
		type: 'number',
		placeholder: '1',
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['referral_program'],
			},
		},
		default: '',
		description: 'Pagination returns the results in pages',
	},
];