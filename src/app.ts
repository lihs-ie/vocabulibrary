import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getExpiration } from './modules/open-ai/client';
import { createVocabularyPage } from './modules/notion';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Query vocabularies is required',
                }),
            };
        }

        const decoded = decodeURIComponent(event.body.split('=')[1]);

        const vocabularies = decoded
            .replace(/(\r\n|\n|\r)/g, ',')
            .replace('+', ' ')
            .split(',');

        await Promise.all(
            vocabularies.map(async (vocabulary: string) => {
                try {
                    const expiration = await getExpiration(vocabulary);
                    await createVocabularyPage(expiration);
                    console.log(`Created "${vocabulary}" page`);
                } catch (error) {
                    console.log(`Failed to create ${vocabulary} page`);
                    console.log(error);
                }
            }),
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: vocabularies,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
