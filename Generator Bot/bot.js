const discord = require(`discord.js`)

const client = new discord.Client({ disableEveryone: false, fetchAllMembers: true })














client.on("guildDelete", async guild => {
  let guildCreateDelete = client.channels.get("614191584682180657");
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  let leaveEmbed = new discord.RichEmbed()
    .setTitle(':x: Guild Left :x:')
    .setDescription(`with invite: https://discord.gg/${invite.code}`)
    .setThumbnail(guild.iconURL)
    .addField('Guild Info', `Name: **${guild.name}** \nID: **${guild.id}**`)
  
  guildCreateDelete.send(leaveEmbed);
});
client.on("guildCreate", async guild => {
  
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  let guildCreateDelete = client.channels.get("614191584682180657");
  let leaveEmbed = new discord.RichEmbed()
    .setTitle(':white_check_mark: Guild Joined :white_check_mark:')
    .setDescription(`with invite: https://discord.gg/${invite.code}`)
    .setThumbnail(guild.iconURL)
    .addField('Guild Info', `Name: **${guild.name}** \nID: **${guild.id}**`)

  
  guildCreateDelete.send(leaveEmbed);
});









client.login('Put.Token.Here')