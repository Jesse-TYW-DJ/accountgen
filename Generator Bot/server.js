const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const update = true;
const http = require('http'); const express = require('express');
const client = new Discord.Client({fetchAllMembers:true});
const config = require("./config.json");
const querystring = require('querystring');
const db = require('quick.db');
function getParam(name, url) {
    if (!url) throw new Error('No URL Provided!');
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const random = (min,max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
if (!update) {
  console.log('Project Update Set OFF');
}
  else 
  {
    console.log('Project Started!');
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Loading Command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.TOKEN);
};
const app = express();

setInterval(() => {
  const snek = require('snekfetch');
  snek.get('https://mbd.glitch.me/').then(() => console.log('pinged self'));
},10*60*1000);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/invite', async (req,res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847`);
});

app.get('/public/*', function(req, res) {
  res.sendFile(__dirname + req.url);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

client.on("guildCreate", async guild => {
  let guildCreateDelete = client.channels.get("614191584682180657");
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  let leaveEmbed = new Discord.RichEmbed()
    .setTitle('<:true12:614191584682180657> Guild Joined <:true12:614191584682180657>')
  .setDescription(`with invite: https://discord.gg/${invite.code}`)
    .setThumbnail(guild.iconURL)
    .addField('Guild Info', `Name: **${guild.name}** \nID: **${guild.id}**`)

  
  guildCreateDelete.send(leaveEmbed);
});
