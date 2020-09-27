const am = require('../assets/waitMessage.js');
const {RichEmbed} = require('discord.js');
const snek = require('snekfetch');
let embed = require('../assets/embed.js')

module.exports.run = async (client,message,args) => {
  if (args[0]) {
    let q = args[0].toLowerCase();
    let modules = ['fun','utility','customization'].sort();
    if (modules.includes(q)) {
    
    } else {
      if (q === 'modules') {
        return message.channel.send(embed(client,message.author,'Here\'s a list of my modules!',modules.join(', ')));
      };
    };
  } else {
    let commands = client.commands.map(c => `\`${client.config.prefix}${c.help.name}${(c.help.usage)?' '+c.help.usage:''}\` | ${c.help.description}`);
    return message.channel.send(embed(client,message.author,'Here\'s a list of my commands!',commands.join('\n')));
  };
};

module.exports.help = {
  name: 'help',
  usage: '[command|module|modules]',
  description: 'Get a list of all the commands and their usage',
  category: 'utility'
};