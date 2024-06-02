import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
    ILoadOptionsFunctions,
    INodePropertyOptions
} from 'n8n-workflow';

import { beehiivApiRequest, } from './GenericFunctions';

export class BeehiivTrigger implements INodeType {
    description: INodeTypeDescription = {
		displayName: 'Beehiiv Trigger',
		name: 'beehiivTrigger',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:beehiiv.png',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when Beehiiv events are recieved',
		defaults: {
			name: 'Beehiiv Trigger',
		},
        inputs: [],
		outputs: ['main'],
        credentials: [
			{
				name: 'beehiivApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
        properties: [
            {
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'post.sent',
						value: 'post.sent',
						description: 'Receive notifications when a new Beehiiv post is sent',
					},
					{
						name: 'subscription.confirmed',
						value: 'subscription.confirmed',
						description: 'Receive notifications when a Beehiiv subscription is confirmed',
					},
                    {
						name: 'subscription.created',
						value: 'subscription.created',
						description: 'Receive notifications when a Beehiiv subscription is created',
					},
                    {
						name: 'subscription.deleted',
						value: 'subscription.deleted',
						description: 'Receive notifications when a Beehiiv subscription is deleted',
					},
                    {
						name: 'subscription.downgraded',
						value: 'subscription.downgraded',
						description: 'Receive notifications when a Beehiiv subscription is downgraded',
					},
                    {
						name: 'subscription.upgraded',
						value: 'subscription.upgraded',
						description: 'Receive notifications when a Beehiiv subscription is upgraded',
					},
                    {
						name: 'survey.response_submitted',
						value: 'survey.response_submitted',
						description: 'Receive notifications when a Beehiiv survey response is submitted',
					},
				],
				default: [],
				required: true,
			},
        ],
	};

    methods = {
		loadOptions: {
			// Get all the available publications to display them to user so that they can
			// select them easily
			async getPublications(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const publications = await beehiivApiRequest.call(this, 'GET', '/publications');
				for (const publication of publications) {
					const publicationName = publication.name;
					const publicationId = publication.uid;
					returnData.push({
						name: publicationName,
						value: publicationId,
					});
				}
				return returnData;
			},
        },
	};

    webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const actionName = this.getNodeParameter('actionName');
                const returnData: INodePropertyOptions[] = [];
				const publications = await beehiivApiRequest.call(this, 'GET', '/publications');
				for (const publication of publications) {
					const publicationName = publication.name;
					const publicationId = publication.uid;
					returnData.push({
						name: publicationName,
						value: publicationId,
					});
				}
				// Check all the webhooks which exist already if it is identical to the
				// one that is supposed to get created.
				const endpoint = `/publications/${publications.value}/webhooks`;
				const webhooks = await  beehiivApiRequest.call(this, 'GET', endpoint, {});

				for (const webhook of webhooks) {
					if (webhook.url === webhookUrl && webhook.actionName === actionName) {
						webhookData.webhookId = webhook.id;
						return true;
					}
				}

				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				const actionName = this.getNodeParameter('actionName');
                const publications = await beehiivApiRequest.call(this, 'GET', '/publications');
                const returnData: INodePropertyOptions[] = [];
				for (const publication of publications) {
					const publicationName = publication.name;
					const publicationId = publication.uid;
					returnData.push({
						name: publicationName,
						value: publicationId,
					});
				}

				const endpoint = `/publications/${publications.value}/webhooks`;

				const body = {
					actionName,
					url: webhookUrl,
				};

				const responseData = await  beehiivApiRequest.call(this, 'POST', endpoint, body);

				if (responseData.id === undefined) {
					// Required data is missing so was not successful
					return false;
				}

				webhookData.webhookId = responseData.id as string;
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
                const publications = await beehiivApiRequest.call(this, 'GET', '/publications');
				const webhookData = this.getWorkflowStaticData('node');
                const returnData: INodePropertyOptions[] = [];
				for (const publication of publications) {
					const publicationName = publication.name;
					const publicationId = publication.uid;
					returnData.push({
						name: publicationName,
						value: publicationId,
					});
				}
				if (webhookData.webhookId !== undefined) {
                    const endpoint = `/publications/${publications.value}/webhooks/${webhookData.webhookId}`;
					try {
						await   beehiivApiRequest.call(this, 'DELETE', endpoint);
					} catch (error) {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registered anymore
					delete webhookData.webhookId;
				}
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();

		return {
			workflowData: [this.helpers.returnJsonArray(body)],
		};
	}
}
