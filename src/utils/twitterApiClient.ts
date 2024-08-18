import { TwitterApi } from 'twitter-api-v2';
import { TwitterKeys } from '../constants';


// Destructure TwitterKeys for use in TwitterApi initialization
const {
    appKey,
    appSecret,
    accessToken,
    accessSecret,
    bearerToken,
} = TwitterKeys;

// Initialize the Twitter API client with read-write and read-only access
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
