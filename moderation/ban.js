var Discord = require('discord.js');

module.exports = {
    name: 'ban',
    permission: 2,
    main: async function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);
        const banee = msg.mentions.users.first();
        var reason = msg.content.split(' ').splice(1).join(' ');
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        if (banee != null) {
            var ban = new Discord.MessageEmbed()
                .setAuthor(banee.username, banee.avatarURL())
                .addField('Member banned:', `**:hammer: ${banee} (${banee.id}) was banned from the server.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor(3447003);
            
            var dm = new Discord.MessageEmbed()
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .setTitle(`**A moderator has banned you.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor(3447003);

            await banee.createDM();
            await banee.send({
                emded: dm
            })
            await msg.guild.members.ban(banee);
            await msg.channel.send({
                embed: ban
            })
            await log.send({
                embed: ban
            })
        } else {
            msg.reply("mention someone!")
        }
    }
};