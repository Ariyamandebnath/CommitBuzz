import { TwitterApi } from 'twitter-api-v2';
import { PrismaClient } from '@prisma/client';
import { TwitterKeys } from '../constants';
import { Request, Response } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        session: {
            accessToken?: string;
            refreshToken?: string;
        };
    }
}

const prisma = new PrismaClient();

const {
    clientSecret,
    clientId,
    callbackUrl
} = TwitterKeys;

const twitterClient = new TwitterApi({
    clientId,
    clientSecret,
});

export const auth = async (req: Request, res: Response): Promise<void> => {
    try {
        const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
            callbackUrl,
            { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
        );

        // Store verifier using Prisma
        await prisma.oAuthState.create({
            data: {
                codeVerifier,
                state,
            },
        });

        res.redirect(url);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error during auth:', error);
            res.status(500).send(`Error during authentication: ${error.message}`);
        } else {
            console.error('An unknown error occurred');
            res.status(500).send('An unknown error occurred during authentication');
        }
    }
};

export const callback = async (req: Request, res: Response): Promise<void> => {
    try {
        const { state: returnedState, code } = req.query as {
            state: string;
            code: string;
        };

        const storedState = await prisma.oAuthState.findFirst({
            where: { state: returnedState },
        });

        if (!storedState) {
            res.status(400).send('Stored tokens do not match!');
            return;
        }

        const {
            client: loggedClient,
            accessToken,
            refreshToken,
        } = await twitterClient.loginWithOAuth2({
            code,
            codeVerifier: storedState.codeVerifier,
            redirectUri: callbackUrl,
        });

        // Store access and refresh tokens in session
        req.session.accessToken = accessToken;
        req.session.refreshToken = refreshToken;

        const { data } = await loggedClient.v2.me(); // Start using the client if you want

        res.send(data);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error during callback:', error);
            res.status(500).send(`Error during callback: ${error.message}`);
        } else {
            console.error('An unknown error occurred');
            res.status(500).send('An unknown error occurred during callback');
        }
    }
};
