import express from 'express';
import {bot} from "./main.js";

const server = express()
server.use(express.json())
server.route('/')
  .get((req, res) => {
    res.send('Hello World!')
  })
  .post((req, res) => {
    res.send('Hello World!')
  });

server.route('/webhook')
  .post((req, res) => {
    const data = req.body
    let message = `${data.title}\n${data.context}\n${data.date}`
    bot.sendMessageToGroup("WeChat-Bot", message)
    // using wechaty send message to wechat group
    // bot.sendMessageToGroup("测试群", message)
  });

export class Server {
  async startServer() {
    const port = process.env.SERVER_PORT || 3000;
    await server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    })
  }

}