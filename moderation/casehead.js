var Discord = require('discord.js');

module.exports = {
    name: "casehead",
    permission: 1,
    main: function (bot, msg) {
        var caseCount = bot.caseNum.count;

        var log = new Discord.MessageEmbed()
        .setTitle('Most Recent Moderation Logs (10)')
        .setTimestamp()
        .setColor(3447003);

        for (let i = caseCount-10; i < caseCount; i++) {
            if (bot.logs[i]) {
                if (msg.guild.members.cache.get(bot.logs[i].userid)) {
                    var username = msg.guild.members.cache.get(bot.logs[i].userid).user.username;
                } else {
                    var username = bot.logs[i].userid;
                }
                var moderator = msg.guild.members.cache.get(bot.logs[i].moderatorid);
                log.addField(username + " | " + bot.logs[i].type + ' issued by ' + moderator.user.username, bot.logs[i].date + '\n' + bot.logs[i].reason + '\nCase ID: ' + bot.logs[i].caseNum)
            } else {
                log.addField("Case " + i, "*This case was deleted.*")
            }
        }

        msg.channel.send({
            embed: log
        })
    }
}