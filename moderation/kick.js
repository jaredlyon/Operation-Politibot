var Discord = require('discord.js');

module.exports = {
    name: 'kick',
    permission: 2,
    main: async function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);

        if (msg.mentions.users.first()) {
            var kickee = msg.mentions.users.first();
        } else if (!msg.mentions.users.first()) {
            var userID = msg.content.split(' ').splice(0)[0];
            var member = msg.guild.members.cache.get(userID);
            var kickee = member.user;
        }

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
                .addField('Case ID: ', caseCount)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor("#992D22");

            var dm = new Discord.MessageEmbed()
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .setTitle(`**A moderator has kicked you.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor("#992D22");
    
            await kickee.createDM();
            await kickee.send({
                embed: dm
            }).catch(async err => {
                console.log(err);
                msg.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
            });
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
        } else {
            msg.reply("mention someone!")
        }
    }
};