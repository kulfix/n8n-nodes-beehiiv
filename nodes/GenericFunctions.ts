import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';

import get from 'lodash/get';

export async function beehiivApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	body: object,
	resource: string,
	_query?: IDataObject,
) {
	const credentials = await this.getCredentials('beehiivApi');
	const publicationId = credentials.publicationId
	const options: IHttpRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body,
		url: `https://api.beehiiv.com/v2/publications/${publicationId}/${resource}`,
		json: true,
	};

	try {
		console.log("OPTIONS",options);
		const response = await this.helpers.requestWithAuthentication.call(this, 'beehiivApi', options);
		console.log("RESPONSE",response);
		return response;
	} catch (error) {
		console.log("ERROR", error);
	}


}

export function eventExists(currentEvents: string[], webhookEvents: IDataObject) {
	for (const currentEvent of currentEvents) {
		if (get(webhookEvents, [currentEvent.split('.')[0], currentEvent.split('.')[1]]) !== true) {
			return false;
		}
	}
	return true;
}

export function validateJSON(json: string | undefined): any {
	let result;
	try {
		result = JSON.parse(json!);
	} catch (exception) {
		result = undefined;
	}
	return result;
}
