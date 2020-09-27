const {RichEmbed} = require('discord.js');
const embed = require('./embed.js');
const db = require('quick.db');

module.exports = (message,client,user) => {
  return embed(client,user,"Error",`${message}`,"RED");
};