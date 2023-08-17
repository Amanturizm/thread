import express from 'express';
import cors from 'cors';
import fileDb from "./fileDb";
import messagesRouter from "./routers/messagesRouter";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/messages', messagesRouter);

app.get('*', (_, res) => res.sendStatus(404));

(async () => {
  await fileDb.init();

  app.listen(port, () => console.log(`Server running at ${port} port...`));
})().catch(e => console.error(e));