var Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    permission: 1,
    main: async function (bot, msg) {
        var input = msg.content.split(' ').splice(0)[0];

        if (msg.mentions.users.first()) {
            var target = msg.mentions.members.first();
        } else if (!msg.mentions.users.first()) {
            if (input === "!userinfo") {
                var target = msg.member;
            } else {
                var target = msg.guild.members.cache.get(input);
            }
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
        
        let trusted = (await bot.trusted.get(target.id)) || {};
        if (target.roles.cache.some(role => role.id === '909989200378601472')) {
            var trustedDate = new Date(trusted.joinDate.getTime() + 1209600000);
            info.addField('User Will Be Trusted On:', trustedDate)
        }

        msg.channel.send({
            embed: info
        });
    }
}