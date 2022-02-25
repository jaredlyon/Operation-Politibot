var Discord = require('discord.js');

module.exports = {
    name: "modlogs",
    permission: 2,
    main: function(bot, msg) {
        var caseCount = bot.caseNum.count;
        var userID = msg.content.split(' ').splice(0)[0];
        const target = msg.guild.members.cache.get(userID);
        if (!target) {
            msg.reply("user is no longer in the server.");
        } else {
            var log = new Discord.MessageEmbed()
                .setTitle('Moderation Command History')
                .setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL())
                .setFooter('User ID: ' + target.id)
                .setTimestamp()
                .setColor(3447003);

            for (let i = 0; i < caseCount; i++) {
                if (bot.logs[i] && userID == bot.logs[i].moderatorid) {
                    var targetedMember = msg.guild.members.cache.get(bot.logs[i].userid);
                    log.addField(bot.logs[i].type + ' issued to ' + targetedMember.user.username, bot.logs[i].date + '\n' + bot.logs[i].reason + '\nCase ID: ' + bot.logs[i].caseNum)
                }
            }

            msg.channel.send({
                embed: log
            })
        }
    }
}