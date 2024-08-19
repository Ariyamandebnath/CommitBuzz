import dotenv from 'dotenv';
dotenv.config({
    path: './.env',
});
// Define the interface for Twitter keys
interface TwitterKeys {
    appKey: string;
    appSecret: string;
    accessToken: string;
    accessSecret: string;
}

// Export the PORT with a default value
export const Port: number = Number(process.env.PORT) || 3000;

// Create and export the TwitterKeys object with type assertion
export const TwitterKeys: TwitterKeys = {
    appKey: process.env.TWITTER_API_KEY as string,
    appSecret: process.env.TWITTER_API_SECRET_KEY as string,
    accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
};
