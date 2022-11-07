import * as dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const token = process.env.TELEGRAM_TOKEN;
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
                  web_app: { url: "https://aromomania.ru/" },
                },
              ],
            ],
          },
        }
      );
    }

    if (msg?.web_app_data?.data) {
      const orders = JSON.parse(msg?.web_app_data?.data);
      await bot.sendMessage(chatId, `Ваш заказ:`);

      for (const order of orders) {
        await bot.sendMessage(chatId, order.name + " " + order.count + " шт.");
      }

      await bot.sendMessage(
        chatId,
        `Спасибо за заказ! С Вами скоро свяжется менеджер!`
      );
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Listening port ${process.env.PORT}...`)
);

app.get("/", (req, res) => {
  res.send("Hello!").status(200);
});

app.post("/bot", async (req, res) => {
  const { queryId, orders } = req.body;

  const message = `Ваш заказ:\n\n${orders
    .map((product) => `${product.name} - ${product.count} шт.`)
    .join("\n")}\n\nИтого: ${orders.reduce(
    (acc, order) => acc + order.price,
    0
  )} рублей!\n\nОжидайте, с Вами свяжется менеджер!`;

  console.log(queryId);

  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Успешная покупка",
      input_message_content: { message_text: message },
    });

    return res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
