import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { beehiivApiRequest, } from './GenericFunctions';

import { automationFields, automationOperations } from './descriptions/AutomationDescription';
import { customFieldsFields, customFieldOperations } from './descriptions/CustomFieldsDescription';
import { postOperations, postFields } from './descriptions/PostDescription';
import { referralOperations, referralFields } from './descriptions/ReferralDescription';
import { subscriptionFields, subscriptionOperations } from './descriptions/SubscriptionsDescription';
import { tagFields, tagsOperations } from './descriptions/TagsDescription';

export class Beehiiv implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Beehiiv',
        name: 'BeehiivNode', 
        icon: 'file:beehiiv.png',
        group: ['output'],
        version: 1,
		description: 'Consumes the Beehiiv API',
		defaults: {
			name: 'Beehiiv Node',
		},
        inputs: ['main'],
		outputs: ['main'],
        credentials: [
			{
				name: 'beehiivApi',
				required: true,
			},
		],
        properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
                options: [
					{
						name: 'Automation',
						value: 'automation',
					},
					{
						name: 'Custom Field',
						value: 'custom_fields',
					},
                    {
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Referral',
						value: 'Referral',
					},
                    {
						name: 'Subscription',
						value: 'subscription',
					},
                    {
						name: 'Tags',
						value: 'tags',
					},
				],
                default: 'subscription',
            },
            // Automation
            ...automationOperations,
            ...automationFields,
            // Custom Fields
            ...customFieldsFields,
            ...customFieldOperations,
            // Posts
            ...postOperations,
            ...postFields,
            // Referrals
            ...referralFields,
            ...referralOperations,
            // Subscriptions
            ...subscriptionFields,
            ...subscriptionOperations,
            // Tags
            ...tagFields,
            ...tagsOperations,
        ],
	};

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: IDataObject[] = [];
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		const body: IDataObject = {};

		let responseData;
        for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'automation') {
                    if (operation === 'create') {
                        const automationId = this.getNodeParameter('automationId', i) as number;
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/automations/${automationId}/journeys`;

						responseData = await beehiivApiRequest.call(this, 'POST', endpoint, body,);
						responseData = responseData.campaign;
					}
                }

                if (resource === 'custom_fields') {
                    if (operation === 'create') {
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/custom_fields`;

						responseData = await beehiivApiRequest.call(this, 'POST', endpoint, body,);
						responseData = responseData.campaign;
					}
                    if (operation === 'delete') {
                        const id = this.getNodeParameter('id', i) as number;
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/custom_fields/${id}`;

						responseData = await beehiivApiRequest.call(this, 'DELETE', endpoint, body,);
						responseData = responseData.campaign;
					}
                    if (operation === 'update') {
                        const id = this.getNodeParameter('id', i) as number;
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/custom_fields/${id}`;

						responseData = await beehiivApiRequest.call(this, 'PUT', endpoint, body,);
						responseData = responseData.campaign;
					}
                }
                if (resource === 'post') {
                    if (operation === 'delete') {
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/custom_fields`;

						responseData = await beehiivApiRequest.call(this, 'DELETE', endpoint, body,);
						responseData = responseData.campaign;
					}
                    if (operation === 'get') {
                        const postId = this.getNodeParameter('postId', i) as number;
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/posts/${postId}`;

						responseData = await beehiivApiRequest.call(this, 'GET', endpoint, body,);
						responseData = responseData.campaign;
					}
                    if (operation === 'update') {
                        const postId = this.getNodeParameter('postId', i) as number;
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/posts/${postId}`;

						responseData = await beehiivApiRequest.call(this, 'PUT', endpoint, body,);
						responseData = responseData.campaign;
					}
                }
                if (resource === 'referral') {
                    if (operation === 'get') {
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/referral_program`;

						responseData = await beehiivApiRequest.call(this, 'GET', endpoint, body,);
						responseData = responseData.campaign;
					}
                }
                if (resource === 'subscription') {
                    if (operation === 'get') {
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/subscriptions`;

						responseData = await beehiivApiRequest.call(this, 'GET', endpoint, body,);
						responseData = responseData.campaign;
					}
                    if (operation === 'create') {
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/subscriptions`;

						responseData = await beehiivApiRequest.call(this, 'POST', endpoint, body,);
						responseData = responseData.campaign;
					}
                    if (operation === 'delete') {
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/subscriptions`;

						responseData = await beehiivApiRequest.call(this, 'DELETE', endpoint, body,);
						responseData = responseData.campaign;
					}
                    if (operation === 'update') {
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/subscriptions`;

						responseData = await beehiivApiRequest.call(this, 'PUT', endpoint, body,);
						responseData = responseData.campaign;
					}
                }
                if (resource === 'subscription') {
                    if (operation === 'create') {
                        const subscriptionId = this.getNodeParameter('automationId', i) as number;
                        const publicationId = this.getNodeParameter('publicationId', i) as number;
						const endpoint = `/publications/${publicationId}/subscriptions/${subscriptionId}/tags`;

						responseData = await beehiivApiRequest.call(this, 'POST', endpoint, body,);
						responseData = responseData.campaign;
					};
                }

                if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else {
					returnData.push(responseData as unknown as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}
        return [this.helpers.returnJsonArray(returnData)];
	}
}
                