import * as dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    if (text === "/start") {
      await bot.sendMessage(chatId, "Received your message", {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Оформить заказ",
                web_app: { url: "https://aromomania.ru/" },
              },
            ],
          ],
        },
      });

      await bot.sendMessage(chatId, "Перейдите на сайт", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Перейдите на сайт",
                web_app: { url: "https://aromomania.ru/" },
              },
            ],
          ],
        },
      });
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

bot.on;
