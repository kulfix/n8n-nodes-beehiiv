import type { INodeProperties } from 'n8n-workflow';

export const automationOperations: INodeProperties[] = [
    {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['journeys'],
			},
		},
        options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Add a existing subscription to a automation journey',
				action: 'Add an existing subscription to an automation journey',
			},
        ],
        default: 'create',
	},
];

export const automationFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                :create/update                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Automation ID',
		name: 'automationId',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['journeys'],
			},
		},
		default: '',
		description: 'The ID of the automation journey',
		required: true,
	},
	{
		displayName: 'Publication ID',
		name: 'publicationId',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['journeys'],
			},
		},
		default: '',
		description: 'The publication ID of the automation',
		required: true,
	},
    {
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['journeys'],
			},
		},
		default: '',
		description: 'The email associated with the subscription',
		required: true,
	},
    {
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['journeys'],
			},
		},
		default: '',
		description: 'The prefixed ID of the subscription',
		required: true,
	},
];