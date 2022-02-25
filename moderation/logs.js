var Discord = require('discord.js');

module.exports = {
    name: "logs",
    permission: 1,
    main: function(bot, msg) {
        var caseCount = bot.caseNum.count;
        var userid = msg.content.split(' ').splice(0)[0];

        var log = new Discord.MessageEmbed()
            .setTitle('Moderation Log History')
            .setTimestamp()
            .setColor(3447003);
        
            if (msg.guild.members.cache.get(userid)) {
                var target = msg.guild.members.cache.get(userid);
                log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
                log.setFooter('User ID: ' + target.id)
            } else {
                var target = userid;
                log.setAuthor("(User left server) ID: " + target);
                log.setFooter('User ID: ' + userid);
            }

        for (let i = 0; i < caseCount; i++) {
            if (bot.logs[i] && bot.logs[i].userid == userid) {
                if (msg.guild.members.cache.get(bot.logs[i].userid)) {
                    var targetUsername = msg.guild.members.cache.get(bot.logs[i].userid).user.username;
                } else{
                    var targetUsername = bot.logs[i].userid;
                }
                log.addField(bot.logs[i].type + ' issued by ' + targetUsername, bot.logs[i].date + '\n' + bot.logs[i].reason + '\nCase ID: ' + bot.logs[i].caseNum)
            }
        }

        msg.channel.send({
            embed: log
        })
    }
}