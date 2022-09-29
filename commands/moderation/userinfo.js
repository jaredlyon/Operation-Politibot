const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Views user info",
    options: [
      {
        type: 6,
        name: "target",
        description: "The targeted user",
        required: true
      }
    ],
	run: async(client, interaction) => {
        var targetUser = await interaction.options.getUser('target');
        console.log(targetUser);
        var targetMember = await interaction.guild.members.fetch(targetUser.id);
        console.log(targetMember);

        if (targetMember.nickname) {
          var nickname = targetMember.nickname;
        } else {
          var nickname = 'None';
        }

        var info = new MessageEmbed()
            .setAuthor(targetUser.tag, targetUser.avatarURL())
            .addField('Nickname:', nickname)
            .addField('Joined At:', targetMember.joinedAt.toString())
            .addField('Account Created At:', targetUser.createdAt.toString())
            .addField('Roles:', targetMember.roles.cache.map(r => `${r}`).join(' | '), true)
            .setFooter("User ID: " + targetUser.id)
            .setTimestamp()
            .setColor(3447003);
        
        /*
        let trusted = (await client.trusted.get(targetUser.id)) || {};
        if (targetMember.roles.cache.some(role => role.id === '909989200378601472')) {
            var trustedDate = new Date(trusted.joinDate.getTime() + 1209600000);
            info.addField('User Will Be Trusted On:', trustedDate)
        }
        */

        interaction.reply({
            embeds: [info]
        });
	},
};