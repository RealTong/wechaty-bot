import express from 'express';
import {bot} from "./main.js";
import {findTokenIsExist, getAuthById} from "./orm.js";
import * as string_decoder from "string_decoder";


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
    let message = JSON.parse(data)
    bot.sendMessageToGroup("WeChat-Bot", message)
  });

server.route('/uptimekuma')
  .post(async (req, res) => {
    const data = req.body
    // 获取header的token
    const token = req.headers['x-token'] as string
    // 获取数据库中的token
    const result = await findTokenIsExist(token);
    if (!result) {
      res.send('token is not exist')
      return
    }
    let message = `${data.heartbeat}\n${data.monitor}\n${data.msg}`
    bot.sendMessageToGroup("WeChat-Bot", message)
  });

export class Server {
  async startServer() {
    const port = process.env.SERVER_PORT || 3000;
    await server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    })
  }

}