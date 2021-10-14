var Discord = require('discord.js');

module.exports = {
    name: 'kick',
    permission: 2,
    main: async function (bot, msg) {
        var channel = msg.guild.channels.cache.get(bot.config.generalChannel);
        var log = msg.guild.channels.cache.get(bot.config.logChannel);
        const kickee = msg.mentions.users.first();
        var reason = msg.content.split(' ').splice(1).join(' ');
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        if (kickee != null) {
            var kick = new Discord.MessageEmbed()
                .setAuthor(kickee.username, kickee.avatarURL())
                .addField('Member kicked:', `**:hiking_boot: ${kickee} (${kickee.id}) was kicked from the server.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor(3447003);

                await msg.guild.members.kick(kickee);
                await channel.send({
                    embed: kick
                })
                await log.send({
                    embed: kick
                })
        } else {
            msg.reply("mention someone!")
        }
    }
};