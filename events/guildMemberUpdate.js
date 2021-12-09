var Discord = require('discord.js');

exports.run = (bot, oldMember, newMember) => {
    if (oldMember.roles.cache.size != newMember.roles.cache.size) {
        //role change
        const roleUpdate = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setTimestamp()
            .setColor(3447003)
            .setFooter(`id: ` + newMember.id)
            .setTimestamp();

            //added roles
            newMember.roles.cache.forEach(role => {
                if (!oldMember.roles.cache.has(role.id)) {
                    roleUpdate.addField(`Added:`, role);
                }
            });

            //removedroles
            oldMember.roles.cache.forEach(role => {
                if (!newMember.roles.cache.has(role.id)) {
                    roleUpdate.addField(`Removed:`, role);
                }
            });

        newMember.guild.channels.cache.get(bot.config.logChannel).send({
            embed: roleUpdate
        })
    }
    
    if (oldMember.nickname != newMember.nickname) {
        //nickname change
        var nicknameUpdate = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setTimestamp()
            .setColor(3447003)
            .setFooter(`id: ` + newMember.id)
            .setTimestamp();

        newMember.guild.channels.cache.get(bot.config.logChannel).send({
            embed: nicknameUpdate
        })
    }
};