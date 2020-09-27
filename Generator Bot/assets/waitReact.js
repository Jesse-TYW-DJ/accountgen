module.exports = async (message,filter,time) => {
    const options = { max:1,time:(time || 5*60*1000), errors: ['time'] };
    try {
      const collector = await message.awaitReactions(filter,options);
      return collector.first();
    } catch (e) {
      let errormsg = await message.channel.send('❌ | Timed Out');
      return {err:'timed out', msg: errormsg};
    };
  };