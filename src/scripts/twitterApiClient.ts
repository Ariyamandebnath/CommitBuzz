import { TwitterApi } from 'twitter-api-v2';
import { TwitterKeys } from '../constants';

const { 
    appKey,
    appSecret,
    accessToken,
    accessSecret,

} = TwitterKeys;

export const twitterClient = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret
});

export const AutoTweet= async (tweetText: string) =>{
    try {
        await twitterClient.v2.tweet(tweetText);
    } catch (error) {
        console.log("Error sending Tweet:", error);
        
    }
}