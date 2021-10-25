var Discord = require('discord.js');

module.exports = {
    name: 'warn',
    permission: 2,
    main: async function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);
        const warnee = msg.mentions.users.first();
        var reason = msg.content.split(' ').splice(1).join(' ');
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        if (warnee != null) {
            var warn = new Discord.MessageEmbed()
                .setAuthor(warnee.username, warnee.avatarURL())
                .addField('Member warned:', `**:exclamation: ${warnee} (${warnee.id}) was warned.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor(3447003);

            var dm = new Discord.MessageEmbed()
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .setTitle(`**A moderator has issued you a warning.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor(3447003);

            await warnee.createDM();
            await warnee.send({
                embed: dm
            })
            await msg.channel.send({
                embed: warn
            })
            await log.send({
                embed: warn
            })
        } else {
            msg.reply("mention someone!")
        }
    }
};