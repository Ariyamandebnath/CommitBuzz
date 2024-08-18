import { TwitterApi } from 'twitter-api-v2';

// Ensure that the environment variables are correctly typed
const appKey: string = process.env.TWITTER_API_KEY as string;
const appSecret: string = process.env.TWITTER_API_SECRET_KEY as string;
const accessToken: string = process.env.TWITTER_ACCESS_TOKEN as string;
const accessSecret: string = process.env.TWITTER_ACCESS_TOKEN_SECRET as string;
const bearerToken: string = process.env.BEARER_TOKEN as string;

// Initialize the Twitter API client
const client = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
});

const bearer = new TwitterApi(bearerToken);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

export { twitterClient, twitterBearer };
