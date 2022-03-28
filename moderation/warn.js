var Discord = require('discord.js');

module.exports = {
    name: 'warn',
    permission: 2,
    main: async function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);

        if (msg.mentions.users.first()) {
            var warnee = msg.mentions.users.first();
        } else if (!msg.mentions.users.first()) {
            var userID = msg.content.split(' ').splice(0)[0];
            var member = msg.guild.members.cache.get(userID);
            var warnee = member.user;
        }

        var caseCount = bot.caseNum.count;
        var reason = msg.content.split(' ').splice(1).join(' ');
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        if (warnee != null) {
            var warn = new Discord.MessageEmbed()
                .setAuthor(warnee.username, warnee.avatarURL())
                .addField('Member warned:', `**:exclamation: ${warnee} (${warnee.id}) was warned.**`)
                .addField('Reason:', reason)
                .addField('Case ID: ', caseCount)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor("#992D22");

            var dm = new Discord.MessageEmbed()
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .setTitle(`**A moderator has issued you a warning. You may appeal the decision through Modmail.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor("#992D22");

            await msg.channel.send({
                embed: warn
            })
            await log.send({
                embed: warn
            })

            bot.logs[caseCount] = {
                caseNum: caseCount,
                userid: warnee.id,
                moderatorid: msg.author.id,
                date: new Date(),
                type: "Warning",
                reason: reason
            };

            bot.caseNum.count++;

            await warnee.createDM();
            await warnee.send({
                embed: dm
            }).catch(async err => {
                console.log(err);
                msg.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
            });

        } else {
            msg.reply("no target found!");
        }
    }
};