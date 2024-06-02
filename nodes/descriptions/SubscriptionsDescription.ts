import type { INodeProperties } from 'n8n-workflow';

export const subscriptionOperations: INodeProperties[] = [
    {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['subscription'],
			},
		},
        options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a subscription',
				action: 'Create a subscription',
			},
            {
				name: 'Delete',
				value: 'delete',
				description: 'Delete a product',
				action: 'Delete a product',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a product',
				action: 'Get a product',
			},
            {
				name: 'Update',
				value: 'update',
				description: 'Update a product',
				action: 'Update a product',
			},
        ],
        default: 'create',
	},
];

export const subscriptionFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                subscription:create/update                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'The email of the subscription',
		required: true,
	},
    {
		displayName: 'Reactivate Existing',
		name: 'reactivate_existing',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: 'false',
		description: 'Reactivate en existing subscription',
	},
    {
		displayName: 'Send Welcome Email',
		name: 'send_welcome_email',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: 'false',
		description: 'Whether or not to reactivate the subscription if they have already unsubscribed.',
	},
    {
		displayName: 'UTM Source',
		name: 'utm_source',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'The source of the subscription.',
        required: false,
	},
    {
		displayName: 'UTM Medium',
		name: 'utm_medium',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'The medium of the subscription',
        required: false,
	},
    {
		displayName: 'UTM Campaign',
		name: 'utm_campaign',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'The acquisition campaign of the subscription',
        required: false,
	},
    {
		displayName: 'Referring Site',
		name: 'referring_site',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'The website that the subscriber was referred from',
        required: false,
	},
    {
		displayName: 'Referral Code',
		name: 'referral_code',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'This should be a subscribers referral_code. This gives referral credit for the new subscription.',
        required: false,
	},
    {
		displayName: 'Tier',
		name: 'tier',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'The tier for the subscription',
        required: false,
	},
    {
		displayName: 'Stripe Customer ID',
		name: 'stripe_customer_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'The Stripe ID for the subscription',
        required: false,
	},
    {
		displayName: 'Stripe Customer ID',
		name: 'stripe_customer_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscriptions'],
			},
		},
		default: '',
		description: 'The Stripe ID for the subscription',
        required: false,
	},
];