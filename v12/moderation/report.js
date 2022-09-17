var Discord = require('discord.js');

module.exports = {
    name: "report",
    aliases: ["mod"],
    permission: 1,
    main: function (bot, msg) {
        var log = msg.guild.channels.cache.get(bot.config.logChannel);
        const args = msg.content.slice(0).trim().split(/ +/g);
        var reason = args.splice(0).join(' ');
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        //#trial-moderators: 893189722887839797
        var modChannel = msg.guild.channels.cache.get('893189722887839797');

        var logEmbed = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle("**Complaint Filed**")
            .addField('Reason:', reason)
            .addField('Message Link:', msg.url)
            .setFooter(bot.user.username, bot.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        log.send({
            embed: logEmbed
        })

        //trial mod role: 893189360105689139
        //mod role: 854841000480079882
        modChannel.send("<@&893189360105689139> <@&854841000480079882> <@&927318500614225920> <@&895051017828311100> **See below complaint:**");
        modChannel.send({
            embed: logEmbed
        })

        //reply
        msg.reply("your complaint has been sent! A staff member will be with you shortly.");
    }
}