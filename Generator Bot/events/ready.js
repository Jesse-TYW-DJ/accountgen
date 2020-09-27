const db = require('quick.db');
const snek = require('snekfetch');
const Discord = require('discord.js');
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
//https://stackoverflow.com/questions/42363140/how-to-find-the-size-of-the-file-in-node-js
module.exports = async (client) => {
  const gInterval = setInterval(() => {
    client.guilds.map(g => {
      let mc = g.channels.find(c => c.name.startsWith('Members'));
      let oc = g.channels.find(c => c.name.startsWith('Online'));
      if (!mc) return;
      if (!oc) return;
      mc.setName(`Members: ${g.members.size}`);
      oc.setName(`Online: ${g.members.filter(m => m.guilds.presence.status !== 'offline').size}`);
    });
  },60*1000);
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: `in ${client.guilds.size} servers || ${client.config['prefix']}help`, type: 'WATCHING' }, status: 'online' });
  console.log(`Invite URL: https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847`)
      let bn = await db.fetch('bn');
    if (!bn || bn == null || isNaN(bn)) {
      bn = await db.set('bn',1);
    } else {
      bn = await db.add('bn',1);
    };
};