var Discord = require('discord.js');

module.exports = {
    name: 'ban',
    permission: 2,
    main: async function (bot, msg) {
        if (!msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '893189360105689139')) {
            var log = msg.guild.channels.cache.get(bot.config.logChannel);

            if (msg.mentions.users.first()) {
                var banee = msg.mentions.users.first();
            } else if (!msg.mentions.users.first()) {
                var userID = msg.content.split(' ').splice(0)[0];
                var member = msg.guild.members.cache.get(userID);
                var banee = member.user;
            }

            var reason = msg.content.split(' ').splice(1).join(' ');
            var caseCount = bot.caseNum.count;
            if (reason === '') {
                reason = 'No reason was specified.'
            };

            if (banee != null) {
                var ban = new Discord.MessageEmbed()
                    .setAuthor(banee.username, banee.avatarURL())
                    .addField('Member banned:', `**:hammer: ${banee} (${banee.id}) was banned from the server.**`)
                    .addField('Reason:', reason)
                    .addField('Case ID: ', caseCount)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor("#992D22");
                
                var dm = new Discord.MessageEmbed()
                    .setAuthor(msg.guild.name, msg.guild.iconURL())
                    .setTitle(`**A moderator has banned you.**`)
                    .addField('Reason:', reason)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor("#992D22");

                await banee.createDM();
                await banee.send({
                    embed: dm
                }).catch(async err => {
                    console.log(err);
                    msg.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
                });
                await msg.guild.members.ban(banee);
                await msg.channel.send({
                    embed: ban
                })
                await log.send({
                    embed: ban
                })

                bot.logs[caseCount] = {
                    caseNum: caseCount,
                    userid: banee.id,
                    moderatorid: msg.author.id,
                    date: new Date(),
                    type: "Ban",
                    reason: reason
                }

                bot.caseNum.count++;
            } else {
                msg.reply("mention someone!")
            }
        } else if (msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '893189360105689139')) {
            msg.reply("Permission denied; go get another mod!");
        }
    }
};