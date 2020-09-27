const {RichEmbed} = require('discord.js');
const embed = require('./embed.js');
const db = require('quick.db');

module.exports = async (help,guild,client,user) => {
  let {name,usage} = help;
  let prefix = await db.fetch(`prefix_${guild.id}`);
  if (prefix == null || !prefix || prefix == undefined) {
    prefix = client.config['prefix'];
  };
  return embed(client,user,"Error",`Incorrect Command Usage!\nCommand Usage: \`${prefix}${name}${usage?` ${usage}`:''}\``,"RED");
};