module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    permission: 1,
    main: async function (bot, msg) {

        var Discord = require('discord.js');
        let topEighteen = await bot.bank
          .orderBy(bot.r.desc(bot.r.row('bank')))
          .limit(18);
  
        var lb = new Discord.MessageEmbed()
          .setColor(msg.guild.me.displayHexColor)
          .setTitle(':moneybag: Bank Balance Leaderboard :moneybag:')
          .setFooter(msg.guild.name, msg.guild.iconURL());
  
        let i = 1;
        topEighteen.forEach(user => {
          lb.addField(`${i}: ${bot.users.cache.get(user.id)
            ? bot.users.cache.get(user.id).username
            : "User Left Server"}`, user ? user.bank : 0, true);
          i++;
        });
        msg.channel.send({ embed: lb });
    }
};