var Discord = require('discord.js');

module.exports = {
    name: "setcount",
    permission: 1,
    main: function(bot, msg) {
        if (msg.author.id == 178689418415177729 || msg.author.id == 133350262420013056) {
            var log = msg.guild.channels.cache.get(bot.config.logChannel);

            if (msg.mentions.users.first()) {
                var target = msg.mentions.users.first();
                var userID = target.id;
            } else if (!msg.mentions.users.first()) {
                var userID = msg.content.split(' ').splice(0)[0];
                var tmp = msg.guild.members.cache.get(userID);
                var target = tmp.user;
            }

            var input = Number(msg.content.split(' ').splice(1)[0]);

            bot.msgCount[userID].count = input;
            msg.reply("user's message count updated!\nNew count: " + bot.msgCount[userID].count);

            var countLog = new Discord.MessageEmbed()
                .setAuthor(target.username, target.avatarURL())
                .addField('Message count updated:', `**:1234: ${target} (${target.id}).**`)
                .addField('New Count:', input)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor("#E74C3C");
            log.send({embed: countLog});
        } else {
            msg.reply("you do not have permission to do this!");
        }
    }
}