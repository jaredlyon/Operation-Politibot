var Discord = require('discord.js');

exports.run = (bot, oldMember, newMember) => {
    if (oldMember.roles.cache.size != newMember.roles.cache.size) {
        //role change
        const roleUpdate = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setTimestamp()
            .setColor("#FFFF00")
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
        
            //welcome message
            if (newMember.roles.cache.some(role => role.name === 'Unverified Member') && !oldMember.roles.cache.some(role => role.name === 'Unverified Member')) {
                //unv role: 909988798308433920
                newMember.guild.channels.cache.get('910017492590686329').send('Welcome in, ' + newMember.toString() + '! Check out <#909995632293449799> and send a DM to <@909999117168676954> in order to access the rest of the server!');
            }

        newMember.guild.channels.cache.get(bot.config.logChannel).send({
            embed: roleUpdate
        })
    }
    
    if (oldMember.nickname != newMember.nickname) {
        //nickname change
        var nicknameUpdate = new Discord.MessageEmbed()
            .setAuthor(newMember.user.tag, newMember.user.avatarURL())
            .setTimestamp()
            .setColor("#FFFF00")
            .setFooter(`id: ` + newMember.user.id)
            .setTimestamp()
            .addField("Old nickname:", oldMember.nickname)
            .addField("New nickname:", newMember.nickname);

        newMember.guild.channels.cache.get(bot.config.logChannel).send({
            embed: nicknameUpdate
        })
    }
};