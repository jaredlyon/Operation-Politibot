const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "approve",
    description: "Approves a user for member status",
    options: [
      {
        type: 6,
        name: "target",
        description: "The user to be approved",
        required: true
      }
    ],
	run: async(client, interaction) => {
        const tick = client.emojis.cache.find(emoji => emoji.name == "tickmark").toString();
        var log = interaction.guild.channels.cache.get(client.config.logChannel);  //logs the stuff

        const targetUser = await interaction.options.getUser('target');
        const userID = targetUser.id;
        const targetMember = await interaction.guild.members.fetch(targetUser);
        
        //member id: 909989200378601472
        //untrusted id: 909988798308433920

        if (interaction.channel.id == client.config.welcomeChannel) {
            if (!targetMember.roles.cache.some(role => role.id === '909989200378601472') && targetMember.roles.cache.some(role => role.id === '909988798308433920')) {
                var logEmbed = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.avatarURL())
                    .addField('Member approved:', tick + ` **${targetUser.username} (${targetUser.id}) was approved.**`)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()
                    .setColor("#FFFFFF");

                let trusted = (await client.trusted.get(userID)) || {};

                await targetMember.roles.add('909989200378601472');
                await targetMember.roles.remove('909988798308433920');

                trusted.joinDate = new Date();
                await client.trusted.update(trusted);
                
                await interaction.reply({
                    embeds: [logEmbed]
                })
                await log.send({
                    embeds: [logEmbed]
                })
            } else {
                interaction.reply('This user has either already been approved or has not accepted our rules prompt.');
            }
        } else {
            interaction.reply("**This command can only be used in #staff-commands.**");
        }
	},
};