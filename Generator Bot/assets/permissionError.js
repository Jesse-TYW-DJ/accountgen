const {RichEmbed} = require('discord.js');
const error = require('./error.js');
const db = require('quick.db');

module.exports = (permissions,client,user) => {
  return error(`You do not have permission to use this command!\nPermission${permissions.length==1?'':'s'} needed: \`${permissions.join(', ')}\``,client,user);
};