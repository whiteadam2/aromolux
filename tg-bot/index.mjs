import * as dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

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
