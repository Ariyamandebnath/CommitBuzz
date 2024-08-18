import app from "./app";
import { Port } from "./constants";
import { twitterClient } from "./controller/twitterApiClient";


app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);    
})
