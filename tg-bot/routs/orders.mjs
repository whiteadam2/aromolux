import express from "express";
import { bot } from "../bot.mjs";
import { messageFromData, orderFromData } from "../utils/convertWebAppData.mjs";
import { sendOrderToShop } from "../api/sendOrderToShop.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { queryId, data } = req.body;
  const order = orderFromData(data);
  const message = messageFromData(data);

  console.log("Managing by Bot... queryId:", queryId);

  try {
    const shopResponse = await sendOrderToShop(order);
    const botResponse = await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Успешная покупка",
      input_message_content: { message_text: message },
    });

    return res
      .status(200)
      .json({ response: { shop: shopResponse.data, bot: botResponse.data } });
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;