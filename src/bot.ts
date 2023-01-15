import {IBotProvider} from "./interface";
import {WechatyBuilder} from "wechaty";
import QRCode from "qrcode";

const bot = WechatyBuilder.build({
  name: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
  puppetOptions: {
    uos: true, // 开启uos协议
  },
  puppet: "wechaty-puppet-wechat",
})

export class WeChatyBot implements IBotProvider {
  botName = "";

  getBotName(): string {
    return this.botName;
  }

  setBotName(value: string = "wechaty-bot") {
    this.botName = value;
  }

  async startBot() {
    bot
      .on("scan", async (qrcode, status) => {
        const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
        console.log(`Scan QR Code to login: ${status}\n${url}`);
        console.log(
          await QRCode.toString(qrcode, {type: "terminal", small: true})
        );
      })
      .on("login", async (user) => {
        console.log(`User ${user} logged in`);
        this.setBotName(user.name());
      })
      .on("message", async (message) => {
        if (message.text().startsWith("/ping")) {
          await message.say("pong");
          return;
        }
        try {
          console.log(`Message: ${message}`);

        } catch (e) {
          console.error(e);
        }
      });
    try {
      await bot.start();
    } catch (e) {
      console.error(
        `⚠️ Bot start failed! \n ${e}`
      );
    }
  }

  async sendMessageToGroup(groupName: string, message: string, mentionUser?: string) {
    const room = await bot.Room.find({topic: groupName});
    if (room) {
      if (mentionUser) {
        const contact = await bot.Contact.find({name: mentionUser})
        if (contact) {
          await room.say(message, contact);
        }else{
          console.log(`Can not find user ${mentionUser}`);
          await room.say(message);
        }
      } else {
        await room.say(message);
      }
    } else {
      console.log("Group not found");
    }
  }
}