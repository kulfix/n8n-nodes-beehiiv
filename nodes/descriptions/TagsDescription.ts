import type { INodeProperties } from 'n8n-workflow';

export const tagsOperations: INodeProperties[] = [
    {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tags'],
			},
		},
        options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a tag',
				action: 'Create a tag',
			},
        ],
        default: 'create',
	},
];

export const tagFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                tag:create/update                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['tag'],
			},
		},
		default: '',
		description: 'The name of the tag',
		required: true,
	},
];