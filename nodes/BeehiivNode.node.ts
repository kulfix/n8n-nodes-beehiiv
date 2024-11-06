/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { beehiivApiRequest, } from './GenericFunctions';

//import { automationFields, automationOperations } from './descriptions/AutomationDescription';
//import { customFieldsFields, customFieldOperations } from './descriptions/CustomFieldsDescription';
//import { postOperations, postFields } from './descriptions/PostDescription';
//import { referralOperations, referralFields } from './descriptions/ReferralDescription';
import { subscriptionFields, subscriptionOperations } from './descriptions/SubscriptionsDescription';
//import { tagFields, tagsOperations } from './descriptions/TagsDescription';
import { NodeConnectionType } from 'n8n-workflow';

export class BeehiivNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Beehiiv',
		name: 'beehiivNode',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:beehiiv.png',
		group: ['output'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Consumes the Beehiiv API',
		defaults: {
			name: 'Beehiiv Node',
		},
		// eslint-disable-next-line
		inputs: [NodeConnectionType.Main],
		// eslint-disable-next-line
		outputs: [NodeConnectionType.Main],
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
						name: 'Subscription',
						value: 'subscription',
					},
				],
				default: 'subscription',
			},
			// Automation
//			...automationOperations,
//			...automationFields,
			// Custom Fields
//			...customFieldsFields,
//			...customFieldOperations,
			// Posts
//			...postOperations,
//			...postFields,
			// Referrals
//			...referralFields,
//			...referralOperations,
			// Subscriptions
			...subscriptionOperations,
			...subscriptionFields,
			// Tags
//			...tagFields,
//			...tagsOperations,
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: IDataObject[] = [];
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0);
		const double_opt_override = this.getNodeParameter('double_opt_override', 0);
		const send_welcome_email = this.getNodeParameter('send_welcome_email', 0);
		const email = this.getNodeParameter('email', 0);
		const operation = this.getNodeParameter('operation', 0);
		const body: IDataObject = {};
		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {

				if (resource === 'subscription') {
					if (operation === 'create') {
						console.log('1\n\n', items[i], '\n\n');
						body.email = email;
						body.double_opt_override=double_opt_override;
						body.send_welcome_email=send_welcome_email;
						const endpoint = `/subscriptions`;
						responseData = await beehiivApiRequest.call(this, 'POST', body, endpoint);
						responseData = responseData.data;
					}
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
