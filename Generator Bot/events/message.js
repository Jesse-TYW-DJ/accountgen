const db = require('quick.db');
const filter = require('leo-profanity');
const hook = require('../assets/hook.js');
const random = (min,max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
  const {promisify} = require('util');
  const sleep = promisify(setTimeout);
const embed = require('../assets/embed.js');
const fs = require('fs');
module.exports = async (client, message) => {
  if (message.channel.type !== 'text') return;
  let channelLogs = db.fetch(`channelLogs_${message.channel.id}`);
  if (!channelLogs || channelLogs == null) {
    channelLogs = await db.set(`channelLogs_${message.channel.id}`,[]);
    channelLogsCallback(client,message);
  } else {
    channelLogsCallback(client,message);
  };
  if (message.author.id === client.user.id) return;
  if (message.author.bot) return;
  if (message.channel.type == 'text') {
    const i = await db.fetch(`xp_${message.author.id}`);
    const last = await db.fetch(`lastxp_${message.author.id}`);
    const addXP = () => {
      if (i===null||!i||isNaN(parseInt(i))) {
        db.set(`xp_${message.author.id}`,random(15,20));
      } else {
        db.add(`xp_${message.author.id}`, random(15,20));
      };
      db.set(`lastxp_${message.author.id}`,(new Date().getTime()+60*1000));
    };
    if (last === null || !last) {
      addXP()
    };
    if (new Date().getTime()>=last) {
      addXP()
    }
  };
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null || !prefix || prefix == undefined) {
    prefix = client.config['prefix'];
  };
  let args,command;
  if (message.content.indexOf(prefix) == 0) {
    args = message.content.slice(prefix.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();
  } else {
    if ([`<@${client.user.id}> `].some(m => message.content.startsWith(m))) {
      args = message.content.slice(`<@${client.user.id}> `.length).trim().split(/ +/g);
      command = args.shift().toLowerCase();
    } else if ([`<@!${client.user.id}> `].some(m => message.content.startsWith(m))) {
      args = message.content.slice(`<@!${client.user.id}> `.length).trim().split(/ +/g);
      command = args.shift().toLowerCase();
    };
  };
  const cmd = client.commands.get(command);
  sleep(1);
/*  const permissions = cmd.permissions;
  if (permissions) {
    if (message.guild.owner.id !== message.author.id && !message.member.hasPermission(permissions)) {
      return message.channel.send(require('../assets/permissionsError.js')(permissions,client,message.author));
    };
  };
  */
  if (!cmd) return;
  cmd.run(client, message, args);
  };

async function channelLogsCallback(client,message) {
  if (!message || !message.content) return;
  let data = {
    guildID: message.guild.id,
    guildName: message.guild.name,
    channelID: message.channel.id,
    channelName: message.channel.name,
    messageID: message.id,
    messageContent: message.content,
    authorID: message.author.id,
    authorTag: message.author.tag,
    bot: message.author.bot,
    createdTimestamp: message.createdTimestamp
  };
  try {
  await db.push(`channelLogs_${message.channel.id}`,data);
  } catch (e) {
    console.log(`Failed: ${message.channel.name} ${message.guild.name} ${e}`); 
  }
};