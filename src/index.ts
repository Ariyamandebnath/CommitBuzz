import app from "./app";
import { Port } from "./constants";
import { twitterClient } from "./utils/twitterApiClient";


app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);    
})

const tweet = async () => {
    try {
        await twitterClient.v2.tweet("Hello World!");

    } catch (e) {
        console.log(e)
    }
}
