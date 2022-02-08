//849498583102914581
var Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    permission: 2,
    main: async function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);

        if (msg.mentions.users.first()) {
            var mutee = msg.mentions.users.first();
        } else if (!msg.mentions.users.first()) {
            var userID = msg.content.split(' ').splice(0)[0];
            var member = msg.guild.members.cache.get(userID);
            var mutee = member.user;
        }

        var reason = msg.content.split(' ').splice(1).join(' ');
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        if (mutee != null) {
            var mute = new Discord.MessageEmbed()
                .setAuthor(mutee.username, mutee.avatarURL())
                .addField('Member unmuted:', `**:mute: ${mutee} (${mutee.id}).**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor("#992D22");
            
            var dm = new Discord.MessageEmbed()
                .setAuthor(msg.guild.name, msg.guild.iconURL())
                .setTitle(`**A moderator has unmuted you.**`)
                .addField('Reason:', reason)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor("#992D22");

            await mutee.createDM();
            await mutee.send({
                embed: dm
            })
            //await msg.guild.members.ban(mutee);
            let role = msg.guild.roles.cache.get("849498583102914581");
            let member = msg.mentions.members.first();
            member.roles.remove(role);
            await msg.channel.send({
                embed: mute
            })
            await log.send({
                embed: mute
            })
        } else {
            msg.reply("mention someone!")
        }
    }
};