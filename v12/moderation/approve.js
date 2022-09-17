var Discord = require('discord.js');

module.exports = {
    name: 'approve',
    permission: 2,
    main: async function (bot, msg) {
        const tick = bot.emojis.cache.find(emoji => emoji.name == "tickmark").toString();
        var channel = msg.guild.channels.cache.get(bot.config.welcomeChannel); //mod channel
        var log = msg.guild.channels.cache.get(bot.config.logChannel);  //logs the stuff

        var userID = msg.content.split(' ').splice(0)[0];

        //get user by id
        const target = msg.guild.members.cache.get(userID);
        //const target = msg.mentions.members.first(); <-- by mention
        
        //member id: 909989200378601472
        //untrusted id: 909988798308433920

        if (msg.channel.id == bot.config.welcomeChannel) {
            if (target != null) {
                if (!target.roles.cache.some(role => role.id === '909989200378601472') && target.roles.cache.some(role => role.id === '909988798308433920')) {
                    var logEmbed = new Discord.MessageEmbed()
                        .setAuthor(msg.author.username, msg.author.avatarURL())
                        .addField('Member approved:', tick + ` **${target} (${target.id}) was approved.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL())
                        .setTimestamp()
                        .setColor("#FFFFFF");

                    let trusted = (await bot.trusted.get(userID)) || {};

                    await target.roles.add('909989200378601472');
                    await target.roles.remove('909988798308433920');
                    trusted.joinDate = new Date();
                    await bot.trusted.update(trusted);
                    await channel.send({
                        embed: logEmbed
                    })
                    await log.send({
                        embed: logEmbed
                    })
                } else {
                    msg.reply('this user has either already been approved or has not accepted our rules prompt.');
                }
            } else {
                msg.reply("target not found! Usage: `!approve [user ID]`\n*Be sure you've correctly copied the user's ID and you're not mentioning them!*");
            }
        } else {
            msg.reply("wrong channel!");
        }
    }
}