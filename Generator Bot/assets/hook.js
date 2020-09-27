module.exports.send = async function (channel, message, options) {
    const init = new Promise(async resolve => { // Create Promise
      async function sendHook(hook, message, options) {
  
          // Check for Embed
          if (typeof message !== 'string' && ['RichEmbed', 'MessageEmbed'].includes(message.constructor.name)) {
              options.embeds = [message];
              message = null;
          }
  
          // Send Webhook
          let callback = await hook.send(message, {
              username: options.name,
              avatarURL: options.icon,
              embeds: options.embeds
          });
        
          resolve(callback);
  
      }
  
      async function fallback(channel, message, timer) {
  
          // Configure Channel
          channel = channel.channel || channel;
  
          // Send Embed
          let callback = await channel.send(message)
  
          // Run Options
          if (timer) callback.delete({
              timeout: timer
          })
        
          resolve(callback);
  
      }
  
      // Verify Input
      if (!channel) return console.log('HOOK: Please read the NPM page for documentation.')
  
      // Configure Channel
      channel = channel.channel || channel;
  
      // Return Statements
      if (!channel.send || !channel.fetchWebhooks) return console.log('HOOK: Invalid Channel.');
      if (!message) return console.log('HOOK: Invalid Message.');
  
      // Configure Settings
      if (!options) options = {};
      options = {
          delete: options.delete || false,
          color: options.color || null,
          name: options.name || 'Message',
          icon: options.icon || undefined
      }
      if (isNaN(options.delete)) options.delete = false;
  
      // Fetch Webhooks
      let sended = false;
      let webhooks = await channel.fetchWebhooks().catch(err => {
          sended = true;
          fallback(channel, message, options.delete)
      });
      if(sended) return;
  
      // Assign Webhook
      let hook = webhooks.find(w => w.name === 'MBD Webhooks')
      if (!hook) {
          try {
              hook = await channel.createWebhook('MBD Webhooks', {
                  avatar: 'https://cdn.discordapp.com/icons/439380552898838530/68629bd045bf3923f90747050c1fa6d4.webp'
              });
          } catch (e) {
              hook = await channel.createWebhook('MBD Webhooks', 'https://cdn.discordapp.com/icons/439380552898838530/68629bd045bf3923f90747050c1fa6d4.webp');
          }
          return sendHook(hook, message, options);
      }
      sendHook(hook, message, options);
    })
    return init;
  }