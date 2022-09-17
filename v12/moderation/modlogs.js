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
                    if (msg.guild.members.cache.get(bot.logs[i].userid)) {
                        var targetUsername = msg.guild.members.cache.get(bot.logs[i].userid).user.username;
                    } else{
                        var targetUsername = bot.logs[i].userid;
                    }
                    log.addField(bot.logs[i].type + ' issued to ' + targetUsername, bot.logs[i].date + '\n' + bot.logs[i].reason + '\nCase ID: ' + bot.logs[i].caseNum);
                }
            }

            msg.channel.send({
                embed: log
            }).catch(async err => {
                console.log(err);
                msg.reply("Discord restricts the length of embeds I can put in here; because of that, the moderator you're probably looking at has a command history too long to put in here. Jared's working on a fix right now though!");
            });
        }
    }
}