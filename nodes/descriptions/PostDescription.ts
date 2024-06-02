import type { INodeProperties } from 'n8n-workflow';

export const postOperations: INodeProperties[] = [
    {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['posts'],
			},
		},
        options: [
            {
				name: 'Delete',
				value: 'delete',
				description: 'Delete a post',
				action: 'Delete a post',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a post',
				action: 'Get a post',
			},
        ],
        default: 'get',
	},
];

export const postFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                post:create/update                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['posts'],
			},
		},
		default: '',
		description: 'The prefixed ID of the post object',
		required: true,
	},
    {
		displayName: 'Publication ID',
		name: 'publicationId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['posts'],
			},
		},
		default: '',
		description: 'The prefixed ID of the publication object',
	},
];