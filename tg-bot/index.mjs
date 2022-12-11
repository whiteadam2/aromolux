import TelegramBot from "node-telegram-bot-api";
import express from "express";
import cors from "cors";
import * as ConfigContainer from "./config/index.cjs";
import { sendOrderToShop } from "./api/sendOrderToShop.mjs";
import { orderFromData, messageFromData } from "./utils/convertWebAppData.mjs";

const bot = new TelegramBot(ConfigContainer.config.tg.botToken, {
  polling: true,
});

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
                  web_app: { url: ConfigContainer.config.tg.webAppUrl },
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

const app = express();
app.use(express.json());
app.use(cors());

app.listen(ConfigContainer.config.port, () =>
  console.log(`Listening port ${ConfigContainer.config.port}...`)
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
