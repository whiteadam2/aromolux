import { config } from "./config/index.cjs";
import * as OrdersService from "./app.mjs";
import * as TgBot from "./bot.mjs";

TgBot.start(config);
OrdersService.start(config);
