var Discord = require('discord.js');

exports.run = (bot, oldMember, newMember) => {
    if (oldMember.roles.cache != newMember.roles.cache) {
        //role change
        const roleUpdate = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setTimestamp()
            .setColor(3447003);

            //added roles
            newMember.roles.cache.forEach(role => {
                if (!oldMember.roles.cache.has(role.id)) {
                    roleUpdate.addField(`Role added:`, role);
                }
            });

            //removedroles
            oldMember.roles.cache.forEach(role => {
                if (!newMember.roles.cache.has(role.id)) {
                    roleUpdate.addField(`Role removed:`, role);
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
            .addField('Old nickname:', `${oldMember.nickname}`)
            .addField('New nickname:', `${newMember.nickname}`)
            .setColor(3447003);

        newMember.guild.channels.cache.get(bot.config.logChannel).send({
            embed: nicknameUpdate
        })
    }
};