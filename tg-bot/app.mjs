import express from "express";
import cors from "cors";
import ordersRouter from "./routs/orders.mjs";

let http = null;

export function start(config) {
  http = express()
    .use(express.json())
    .use(cors())
    .use("/orders", ordersRouter)
    .listen(config.port, () => console.log(`Listening port ${config.port}...`));
}

export async function stop() {
  if (http) {
    http.close();
  }
  console.log("Service stopped");
}
