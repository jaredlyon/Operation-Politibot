const { MessageEmbed, Message } = require("discord.js");

module.exports = {
	name: 'guildMemberUpdate',
	async execute(oldMember, newMember, client) {
        // checks if roles differ
        if (oldMember.roles.cache.size != newMember.roles.cache.size) {
            // generate embed
            const roleUpdate = new MessageEmbed()
                .setAuthor(newMember.user.tag, newMember.user.avatarURL())
                .setTimestamp()
                .setColor("#FFFF00")
                .setFooter(`id: ` + newMember.id)
                .setTimestamp();
    
                //added roles
                newMember.roles.cache.forEach(role => {
                    if (!oldMember.roles.cache.has(role.id)) {
                        roleUpdate.addField(`Added:`, role.name);
                    }
                });
    
                //removed roles
                oldMember.roles.cache.forEach(role => {
                    if (!newMember.roles.cache.has(role.id)) {
                        roleUpdate.addField(`Removed:`, role.name);
                    }
                });
            
                //welcome message
                if (newMember.roles.cache.some(role => role.name === 'Unverified Member') && !oldMember.roles.cache.some(role => role.name === 'Unverified Member')) {
                    //unv role: 909988798308433920
                    newMember.guild.channels.cache.get('910017492590686329').send('Welcome in, ' + newMember.toString() + '! Check out <#909995632293449799> and <#775838975755681842>, then use /verify to gain access to the server! This client is in early alpha, so if you encounter bugs, such as "Interaction has failed", please try again! If you cannot find any success, reach out to us by opening a ticket using the <#999439440273473657> channel.');
                }
    
            // sends embed
            newMember.guild.channels.cache.get(client.config.logChannel).send({
                embeds: [roleUpdate]
            });
        } else {
            console.log(oldMember.displayName + " was updated but kept the same roles.");
        }
        
        // checks for nickname change
        if (oldMember.displayName != newMember.displayName) {
            // generate embed
            const nicknameUpdate = new MessageEmbed()
                .setAuthor(newMember.user.tag, newMember.user.avatarURL())
                .setTimestamp()
                .setColor("#FFFF00")
                .setFooter(`id: ` + newMember.user.id)
                .setTimestamp()
                .addField("Old nickname:", oldMember.displayName)
                .addField("New nickname:", newMember.displayName);
    
            // sends embed
            newMember.guild.channels.cache.get(client.config.logChannel).send({
                embeds: [nicknameUpdate]
            });
        }
	}
};