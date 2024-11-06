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
				resource: ['subscription'],
			},
		},
		default: '',
		description: 'The email of the subscription',
		required: true,
	},
	{
		displayName: 'Double Opt Override',
		name: 'double_opt_override',
		type: 'string',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: 'off',
		description: 'Whether to override the double opt-in setting',
		required: true,
	},
	{
		displayName: 'Send Welcome Email',
		name: 'send_welcome_email',
		type: 'boolean',
		placeholder: '',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: false,
		description: 'Whether to send the welcome email',
		required: true,
	},
/*	{
		displayName: 'Reactivate Existing',
		name: 'reactivate_existing',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: false,
		description: 'Whether to reactivate an existing subscription',
	},
	{
		displayName: 'Send Welcome Email',
		name: 'send_welcome_email',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: false,
		description: 'Whether or not to reactivate the subscription if they have already unsubscribed',
	},
	{
		displayName: 'UTM Source',
		name: 'utm_source',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: '',
		description: 'The source of the subscription',
	},
	{
		displayName: 'UTM Medium',
		name: 'utm_medium',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: '',
		description: 'The medium of the subscription',
	},
	{
		displayName: 'UTM Campaign',
		name: 'utm_campaign',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: '',
		description: 'The acquisition campaign of the subscription',
	},
	{
		displayName: 'Referring Site',
		name: 'referring_site',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: '',
		description: 'The website that the subscriber was referred from',
	},
	{
		displayName: 'Referral Code',
		name: 'referral_code',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: '',
		description:
			'This should be a subscribers referral_code. This gives referral credit for the new subscription.',
	},
	{
		displayName: 'Tier',
		name: 'tier',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: '',
		description: 'The tier for the subscription',
	},
	{
		displayName: 'Stripe Customer ID',
		name: 'stripe_customer_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: '',
		description: 'The Stripe ID for the subscription',
	},
	{
		displayName: 'Stripe Customer ID',
		name: 'stripe_customer_id',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['subscription'],
			},
		},
		default: '',
		description: 'The Stripe ID for the subscription',
	},
	*/
];
