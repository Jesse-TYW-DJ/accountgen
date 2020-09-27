const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Can't Use This Command Kiddo! Because Your Missing Administrator Permission**");
    if(args[0] == "help"){
      message.reply("Usage: !ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("**I Can't Find This User ! Mention The User To Be Able To Use This Command**");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("**This User Cant Be Banned Because He Had A Role Highler Than You** ``/OR/`` **He Is The Owner Of This Server** ``/OR/`` **He Had Administrator Permission**");
    let bReason = args.slice(1).join(" ") || "None";
    
    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("0x#DF0101")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

let incidentchannel = message.guild.channels.find(`name`, "log");
    if(!incidentchannel) return message.channel.send("**Can't find log channel. Please Create A New Channel With log Name To Be Able To Use This Command**");
    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
     message.react('⚒');
}

module.exports.help = {
  name:"ban"
}
