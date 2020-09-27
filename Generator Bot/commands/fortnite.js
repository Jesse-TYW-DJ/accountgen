let responses = ["It is certain","It is decidedly so","Without a doubt","Yes – definitely","You may rely on it","As I see it, yes","Most likely","Outlook good","Yes","Signs point to yes","Don’t count on it","My reply is no","My sources say no","Outlook not so good","Very doubtful","Reply hazy, try again","Ask again later","Better not tell you now","Cannot predict now","Concentrate and ask again"];
const am = require('../assets/waitMessage.js');
const Discord = require('discord.js');
const talkedRecently = new Set();
const client = new Discord.Client();
const {RichEmbed} = require('discord.js');
const snek = require('snekfetch');
let embed = require('../assets/embed.js')
const {getfortnite} = require('../fortnite.js');
const db = require('quick.db');
const error = require('../assets/error.js');



module.exports.run = async (client,message,args) => {
		
  if (message.channel.name !== 'generate') return message.channel.send('**You Must Go To The Channel #generate For The Access Of This Command**');
  
  let lastfortnite = await db.fetch(`lastfortnite_${message.author.id}`);
  if (lastfortnite) {
    if (new Date().getTime() < lastfortnite+300500) {
      let remaining = lastfortnite+300500 - new Date().getTime() ;
      return message.channel.send(
       new Discord.RichEmbed()
    .setTitle(':x:**__ERROR__**:x:')
    .setColor("#FF0000")
    .setThumbnail("https://i.imgur.com/6QXjhQe.png")
    .setDescription(`You Must Wait 10 Minutes To Use This Command Again!\nTime Remaining: \`${Math.floor(remaining/1000)} Seconds\``,client,message.author)
    .setFooter('')
    .setTimestamp());
    };
  };
  let account = getfortnite();
  await message.author.send(
    new Discord.RichEmbed()
    .setTitle('Fortnite Account')
    .setColor("#8F00FF")
    .setThumbnail("https://i.imgur.com/09Fxrfw.png%27%22")
    .setDescription(`\nEmail: ${account.email} \nPassword: ${account.password}`)
    .setFooter('')
    .setTimestamp());

  await message.channel.send(
    new Discord.RichEmbed()
    .setTitle('Successfully Generated! ✓')
    .setColor("#13FF00")
    .setThumbnail("https://i.imgur.com/oDiiPCq.png")
    .setDescription("Check Your DM's i Sent You The Details.") 
    .setFooter('').setTimestamp())
  await db.set(`lastfortnite_${message.author.id}`, new Date().getTime());
  
};


module.exports.help = {
  name: 'fortnite',
  usage: '',
  description: 'Get a fortnite account',
  category: 'fun'
};