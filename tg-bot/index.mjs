import * as dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import express from "express";
import cors from "cors";
import { sendOrderToShop } from "./api/sendOrderToShop.mjs";
import { orderFromData, messageFromData } from "./utils/convertWebAppData.mjs";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const token = process.env.TELEGRAM_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Для того чтобы получить духи со скидкой, перейдите в приложение:",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Перейти",
                  web_app: { url: webAppUrl },
                },
              ],
            ],
          },
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Listening port ${process.env.PORT}...`)
);

app.get("/", (req, res) => res.send("Web service is working..."));

app.post("/bot", async (req, res) => {
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
