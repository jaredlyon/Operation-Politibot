var Discord = require('discord.js');

module.exports = {
    name: 'mute',
    permission: 2,
    main: async function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);

        if (msg.mentions.users.first()) {
            var mutee = msg.mentions.users.first();
            var member = msg.mentions.members.first();
        } else if (!msg.mentions.users.first()) {
            var userID = msg.content.split(' ').splice(0)[0];
            var member = msg.guild.members.cache.get(userID);
            var mutee = member.user;
        }

        var length = Number(msg.content.split(' ').splice(1)[0]);
        var caseCount = bot.caseNum.count;

        if (mutee != null) {
            if (!length) {
                var reason = msg.content.split(' ').splice(1).join(' ');
                if (reason === '') {
                    reason = 'No reason was specified.'
                };

                var mute = new Discord.MessageEmbed()
                    .setAuthor(mutee.username, mutee.avatarURL())
                    .addField('Member muted:', `**:mute: ${mutee} (${mutee.id}).**`)
                    .addField('Reason:', reason)
                    .addField('Case ID: ', caseCount)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor("#E74C3C");

                //await msg.guild.members.ban(mutee);
                var dm = new Discord.MessageEmbed()
                    .setAuthor(msg.guild.name, msg.guild.iconURL())
                    .setTitle(`**A moderator has muted you.**`)
                    .addField('Reason:', reason)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor("#E74C3C");

                let role = msg.guild.roles.cache.get("849498583102914581");
                member.roles.add(role);
                await msg.channel.send({
                    embed: mute
                });
                await log.send({
                    embed: mute
                });

                bot.logs[caseCount] = {
                    caseNum: caseCount,
                    userid: mutee.id,
                    moderatorid: msg.author.id,
                    date: new Date(),
                    type: "Mute (Indefinite)",
                    reason: reason
                }

                bot.caseNum.count++;

                await mutee.createDM();
                await mutee.send({
                    embed: dm
                }).catch(async err => {
                    console.log(err);
                    msg.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
                });
            } else if (length) {
                var reason = msg.content.split(' ').splice(2).join(' ');
                if (reason === '') {
                    reason = 'No reason was specified.'
                };

                var mute = new Discord.MessageEmbed()
                    .setAuthor(mutee.username, mutee.avatarURL())
                    .addField(`Member muted for ${length}m:`, `**:mute: ${mutee} (${mutee.id}).**`)
                    .addField('Reason:', reason)
                    .addField('Case ID: ', caseCount)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor("#E74C3C");

                //await msg.guild.members.ban(mutee);
                var dm = new Discord.MessageEmbed()
                    .setAuthor(msg.guild.name, msg.guild.iconURL())
                    .setTitle(`**A moderator has muted you for ${length}m:. You may appeal the decision through Modmail.**`)
                    .addField('Reason:', reason)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor("#E74C3C");

                let role = msg.guild.roles.cache.get("849498583102914581");
                member.roles.add(role);

                setTimeout(function() {
                    member.roles.remove(role);
                }, length * 60000);

                await msg.channel.send({
                    embed: mute
                });
                await log.send({
                    embed: mute
                });

                bot.logs[caseCount] = {
                    caseNum: caseCount,
                    userid: mutee.id,
                    moderatorid: msg.author.id,
                    date: new Date(),
                    type: "Mute (" + length + "m)",
                    reason: reason
                }

                bot.caseNum.count++;

                await mutee.createDM();
                await mutee.send({
                    embed: dm
                }).catch(async err => {
                    console.log(err);
                    msg.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
                });
            }
        } else {
            msg.reply("mention someone!");
        }
    }
};