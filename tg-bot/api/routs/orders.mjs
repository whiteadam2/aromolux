import express from "express";
import { bot } from "../../bot.mjs";
import {
  messageFromData,
  orderFromData,
} from "../../utils/convertWebAppData.mjs";
import { sendOrderToShop } from "../../utils/sendOrderToShop.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { queryId, data } = req.body;
  const order = orderFromData(data);
  const message = messageFromData(data);

  try {
    await sendOrderToShop(order);
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Успешная покупка",
      input_message_content: { message_text: message },
    });
    return res.status(200);
  } catch (e) {
    return res.status(403).send(e);
  }
});

export default router;
