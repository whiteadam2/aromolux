import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import ordersRouter from "./routs/orders.mjs";
import { validation } from "./middleware/validation.js";
import { WebAppDataSchema } from "./schemas/WebAppDataSchema.mjs";
import * as swagger from "./swagger.json" assert { type: "json" };

let http = null;

export function start(config) {
  http = express()
    .use(express.json())
    .use(cors())
    .use("/orders", validation(WebAppDataSchema), ordersRouter)
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger.default))
    .listen(config.port, () => console.log(`Listening port ${config.port}...`));
}

export async function stop() {
  if (http) {
    http.close();
  }
  console.log("Service stopped");
}
