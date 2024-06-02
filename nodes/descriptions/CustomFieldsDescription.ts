import type { INodeProperties } from 'n8n-workflow';

export const customFieldOperations: INodeProperties[] = [
    {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['custom_fields'],
			},
		},
        options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a custom field',
				action: 'Create a custom field',
			},
            {
				name: 'Delete',
				value: 'delete',
				description: 'Delete a custom field',
				action: 'Delete a custom field',
			},
            {
				name: 'Update',
				value: 'update',
				description: 'Update a custom field',
				action: 'Update a custom field',
			},
        ],
        default: 'create',
	},
];

export const customFieldsFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                :create/update                       */
	/* -------------------------------------------------------------------------- */

    {
		displayName: 'ID',
		name: 'id',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['delete'],
				resource: ['custom_fields'],
			},
		},
		default: '',
		description: 'The ID of the custom field',
		required: true,
	},
    {
		displayName: 'Publication ID',
		name: 'publicationId',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create', 'delete', 'update'],
				resource: ['custom_fields'],
			},
		},
		default: '',
		description: 'The publication ID of the automation',
		required: true,
	},
    {
		displayName: 'Display',
		name: 'display',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create', 'delete', 'update'],
				resource: ['custom_fields'],
			},
		},
		default: '',
		description: 'The content of the custom field',
		required: true,
	},
];