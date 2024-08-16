import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
const app = express()


app.use(bodyParser.json())
app.get('/', (req:Request, res:Response) => {
    res.send(`Github To Twitter Project`)
})

export default app;