var Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    permission: 1,
    main: function (bot, msg) {
        if (msg.mentions.users.first()) {
            var target = msg.mentions.members.first();
        } else if (!msg.mentions.users.first()) {
            var userID = msg.content.split(' ').splice(0)[0];
            var target = msg.guild.members.cache.get(userID);
        }

        var info = new Discord.MessageEmbed()
            .setAuthor(target.user.tag, target.user.avatarURL())
            .addField('Nickname:', target.nickname)
            .addField('Joined At:', target.joinedAt)
            .addField('Account Created At:', target.user.createdAt)
            .addField('Roles:', target.roles.cache.map(r => `${r}`).join(' | '), true)
            .setFooter("User ID: " + target.id)
            .setTimestamp()
            .setColor(3447003);

        msg.channel.send({
            embed: info
        });
    }
}