import TelegramBot from "node-telegram-bot-api";

export let bot = null;

export function start(config) {
  if (bot) return bot;
  bot = new TelegramBot(config.tg.botToken, {
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
                    web_app: { url: config.tg.webAppUrl },
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
  bot.on("polling_error", (error) => {
    console.log(error.code);
  });
}
