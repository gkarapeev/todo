import express, { Application, Request, Response } from "express";
import { join } from "path";

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(3000, () => console.log('Sverver running on port 3000'));
