var Discord = require('discord.js');

exports.run = async (bot, member) => {
    var channel = member.guild.channels.cache.get(bot.config.logChannel);
    var join = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL())
        .setFooter(member.guild.name)
        .setTimestamp()
        .setTitle('Member joined!')
        .setColor(3447003);

    channel.send({
        embed: join
    })


    await bot.bank.insert({
        id: member.user.id,
        balance: 0,
        bank: 500,
        lastMessage: null,
    })

    await bot.streaks.insert({
        id: member.user.id,
        lastDaily: null,
        streak: 0,
    })

    console.log("[BANK] | Created new account for " + member.user.username + "!")
}