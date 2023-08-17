import express from "express";
import fileDb from "../fileDb";
import { TMessageWithoutId } from "../types";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();

  res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  if (!req.body.message) {
    return res.status(400).send({ "error": "Missing message field" });
  }

  const message: TMessageWithoutId = {
    author: req.body.author || null,
    message: req.body.message,
    image: req.body.image || null,
  };

  const id = await fileDb.addItem(message);

  res.send({ id });
});

export default messagesRouter;