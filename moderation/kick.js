var Discord = require('discord.js');

module.exports = {
    name: 'kick',
    permission: 2,
    main: async function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);
        const kickee = msg.mentions.users.first();
        var reason = msg.content.split(' ').splice(1).join(' ');
        var caseCount = bot.caseNum.count;
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

            var dm = new Discord.MessageEmbed()
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .setTitle(`**A moderator has kicked you.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor(3447003);
    
            const user = msg.guild.member(kickee);
            await user.kick();
            await msg.channel.send({
                embed: kick
            })
            await log.send({
                embed: kick
            })

            bot.logs[caseCount] = {
                caseNum: caseCount,
                userid: kickee.id,
                moderatorid: msg.author.id,
                date: new Date(),
                type: "Kick",
                reason: reason
            }

            bot.caseNum.count++;

            await kickee.createDM()
            await kickee.send({
                emded: dm
            })
        } else {
            msg.reply("mention someone!")
        }
    }
};