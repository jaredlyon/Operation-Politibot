var Discord = require('discord.js');

exports.run = (bot, oldMember, newMember) => {
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        //role remove
        const roleUpdate = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setTimestamp()
            .setColor(3447003);

            oldMember.roles.cache.forEach(role => {
                if (!newMember.roles.cache.has(role.id)) {
                    roleUpdate.addField(`Role removed:`, role);
                }
            });

        newMember.guild.channels.cache.get(bot.config.logChannel).send({
            embed: roleUpdate
        })
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        //role add
        const roleUpdate = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setTimestamp()
            .setColor(3447003);

            newMember.roles.cache.forEach(role => {
                if (!oldMember.roles.cache.has(role.id)) {
                    roleUpdate.addField(`Role added:`, role);
                }
            });

        newMember.guild.channels.cache.get(bot.config.logChannel).send({
            embed: roleUpdate
        })
    } else if (oldMember.roles.cache != newMember.roles.cache) {
        //roley poley catch
        const roleUpdate = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setTimestamp()
            .setColor(3447003);

            //removed roles
            newMember.roles.cache.forEach(role => {
                if (!oldMember.roles.cache.has(role.id)) {
                    roleUpdate.addField(`Role removed:`, role);
                }
            });

            //added roles
            oldMember.roles.cache.forEach(role => {
                if (!newMember.roles.cache.has(role.id)) {
                    roleUpdate.addField(`Role added:`, role);
                }
            });

        newMember.guild.channels.cache.get(bot.config.logChannel).send({
            embed: roleUpdate
        })
    } else if (oldMember.nickname != newMember.nickname) {
        //nickname change
        const nicknameUpdate = new Discord.MessageEmbed()
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