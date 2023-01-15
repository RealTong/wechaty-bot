import {Server} from "./server.js";
import {WeChatyBot} from "./bot.js";

const server = new Server();
const bot = new WeChatyBot();

// 启动server和bot
(async () => {
  await server.startServer();
  await bot.startBot();
})();

export {server, bot};
