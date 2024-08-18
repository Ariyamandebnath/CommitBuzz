// src/controllers/tweetController.ts

import { Request, Response } from 'express';
import { TwitterApi } from 'twitter-api-v2';
import { TwitterKeys } from '../constants'; // Adjust the path as necessary

const {
    clientSecret,
    clientId,
} = TwitterKeys;

const twitterClient = new TwitterApi({
    clientId,
    clientSecret,
});

export const tweet = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accessToken, refreshToken } = req.session as { accessToken?: string; refreshToken?: string };

        if (!accessToken || !refreshToken) {
            res.status(401).send('Unauthorized');
            return;
        }

        // Refresh tokens
        const {
            client: refreshedClient,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        } = await twitterClient.refreshOAuth2Token(refreshToken);

        req.session.accessToken = newAccessToken;
        req.session.refreshToken = newRefreshToken;

        // Assuming nextTweet is the tweet content
        const nextTweet = 'Hello everyone!'; // Hardcoded example; replace with dynamic content as needed

        const { data } = await refreshedClient.v2.tweet(nextTweet);

        res.send(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error during tweeting:', error);
            res.status(500).send(`Error during tweeting: ${error.message}`);
        } else {
            console.error('Unknown error during tweeting:', error);
            res.status(500).send('An unknown error occurred during tweeting.');
        }
    }
};
