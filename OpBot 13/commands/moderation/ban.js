const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "ban",
    description: "Bans a user",
    options: [
      {
        "type": 6,
        "name": "banee",
        "description": "The user to be banned",
        "required": true
      },
      {
        "type": 3,
        "name": "reason",
        "description": "The reason for issue",
      }
    ],
	run: async(client, interaction) => {
		if (!interaction.guild.members.cache.get(interaction.author.id).roles.cache.some(role => role.id === '893189360105689139')) {
            var log = interaction.guild.channels.cache.get(client.config.logChannel);
            var banee = interaction.options.get('banee');
            var reason = interaction.options.get('reason');

            var caseCount = client.caseNum.count;
            if (reason === '') {
                reason = 'No reason was specified.'
            };

            if (banee != null) {
                var ban = new MessageEmbed()
                    .setAuthor(banee.username, banee.avatarURL())
                    .addField('Member banned:', `**:hammer: ${banee} (${banee.id}) was banned from the server.**`)
                    .addField('Reason:', reason)
                    .addField('Case ID: ', caseCount)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()
                    .setColor("#992D22");
                
                var dm = new MessageEmbed()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL())
                    .setTitle(`**A moderator has banned you.**`)
                    .addField('Reason:', reason)
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setTimestamp()
                    .setColor("#992D22");

                await banee.createDM();
                await banee.send({
                    embeds: [dm]
                }).catch(async err => {
                    console.log(err);
                    interaction.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
                });
                await interaction.guild.members.ban(banee);
                await interaction.channel.send({
                    embeds: [ban]
                })
                await log.send({
                    embeds: [ban]
                })

                client.logs[caseCount] = {
                    caseNum: caseCount,
                    userid: banee.id,
                    moderatorid: interaction.author.id,
                    date: new Date(),
                    type: "Ban",
                    reason: reason
                }

                client.caseNum.count++;
            } else {
                interaction.reply("mention someone!")
            }
        } else if (interaction.guild.members.cache.get(interaction.author.id).roles.cache.some(role => role.id === '893189360105689139')) {
            interaction.reply("Permission denied; go get another mod!");
        }
	},
};