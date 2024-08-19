import app from "./app";
import { Port } from "./constants";
import { AutoTweet } from "./scripts/twitterApiClient";

app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);    
})


AutoTweet("Test Tweet!!")