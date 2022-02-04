var Discord = require('discord.js');

module.exports = {
    name: 'mute',
    permission: 2,
    main: async function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);
        const mutee = msg.mentions.users.first();
        var reason = msg.content.split(' ').splice(2).join(' ');
        var length = Number(msg.content.split(' ').splice(1)[0]);
        var caseCount = bot.caseNum.count;
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        if (mutee != null) {
            if (!length) {
                var mute = new Discord.MessageEmbed()
                    .setAuthor(mutee.username, mutee.avatarURL())
                    .addField('Member muted:', `**:mute: ${mutee} (${mutee.id}).**`)
                    .addField('Reason:', reason)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor(3447003);

                //await msg.guild.members.ban(mutee);
                var dm = new Discord.MessageEmbed()
                    .setAuthor(msg.guild.name, msg.guild.iconURL())
                    .setTitle(`**A moderator has muted you.**`)
                    .addField('Reason:', reason)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor(3447003);

                let role = msg.guild.roles.cache.get("849498583102914581");
                let member = msg.mentions.members.first();
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
                    type: "Mute",
                    reason: reason
                }

                bot.caseNum.count++;

                await mutee.createDM();
                await mutee.send({
                    emded: dm
                });
            } else if (length) {
                var mute = new Discord.MessageEmbed()
                .setAuthor(mutee.username, mutee.avatarURL())
                .addField(`Member muted for ${length}m:`, `**:mute: ${mutee} (${mutee.id}).**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor(3447003);

                //await msg.guild.members.ban(mutee);
                var dm = new Discord.MessageEmbed()
                    .setAuthor(msg.guild.name, msg.guild.iconURL())
                    .setTitle(`**A moderator has muted you.**`)
                    .addField('Reason:', reason)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor(3447003);

                let role = msg.guild.roles.cache.get("849498583102914581");
                let member = msg.mentions.members.first();
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
                    type: "Mute",
                    reason: reason
                }

                bot.caseNum.count++;

                await mutee.createDM();
                await mutee.send({
                    emded: dm
                });
            }
        } else {
            msg.reply("mention someone!");
        }
    }
};