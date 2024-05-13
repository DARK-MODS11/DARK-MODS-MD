const plugins = require("../../lib/plugins");
const { command, isPrivate, clockString, pm2Uptime } = require("../../lib");
const { OWNER_NAME, BOT_NAME } = require("../../config");
const { hostname } = require("os");

command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match, m, client) => {
try{
    if (match) {
      for (let i of plugins.commands) {
        if (
          i.pattern instanceof RegExp &&
          i.pattern.test(message.prefix + match)
        ) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
          message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
        }
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
        let usern = message.pushName
        const readMore = String.fromCharCode(8206).repeat(4001);
      let menu = `\n╭━━━〔 ${BOT_INFO.split(";")[0]} 〕━━━┈
    ╭──────────────
  ⎆ │  *OWNER*: ${BOT_INFO.split(";")[1]}
  ⎆ │  *USER*: ${usern}
  ⎆ │  *DATE*: ${date}
  ⎆ │  *TIME*: ${time}
  ⎆ │  *COMMANDS*: ${plugins.commands.length}
  ⎆ │  *MODE*: ${config.WORK_TYPE}
  ⎆ │  *PREFIX*: ${config.HANDLERS}
  ⎆ │  *VERSION*: ${require("../package.json").version}
    ╰──────────────
╰━━━━━━━━━━━━━━━┈\n ${readMore}`

      let cmnd = [];
      let cmd;
      let category = [];
      plugins.commands.map((command, num) => {
        if (command.pattern instanceof RegExp) {
          cmd = command.pattern.toString().split(/\W+/)[1];
        }

        if (!command.dontAddCommandList  && cmd !== undefined) {
          let type = command.type ? command.type.toLowerCase() : "misc";

          cmnd.push({ cmd, type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `\n ╭─────────────┈⚆`;
        menu += `\n  │ 「 *${cmmd.toUpperCase()}* 」`;
        menu += `\n ╰┬────────────┈⚆`
        menu += `\n ╭┴────────────┈⚆`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n❆  ${cmd.trim()}`;
        });
        menu += `\n ╰─────────────┈⚆`;
      });
menu += `\n\nᴅᴀʀᴋ-ᴍᴏᴅꜱ-ᴍᴅ`;
      let penu = tiny(menu)
      let img = config.BOT_INFO.split(';')[2]
      return await message.sendFromUrl(img, {fileLength: "5555544444", gifPlayback: true, contextInfo: { externalAdReply: {
title: "ᴅᴀʀᴋ-ᴍᴏᴅꜱ-ᴍᴅ",
body: "",
sourceUrl: "",
mediaUrl: "",
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnailUrl: "https://i.imgur.com/DZaQOqK.jpeg" }}, caption: (penu)}, {quoted: message })
    }
}catch(e){
message.reply(e)
}
  }
);
