const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "approve",
    description: "Approves a user for member status",
    options: [
      {
        "type": 6,
        "name": "target",
        "description": "The user to be approved",
        "required": true
      }
    ],
	run: async(client, interaction) => {
        const tick = client.emojis.cache.find(emoji => emoji.name == "tickmark").toString();
        var channel = interaction.guild.channels.cache.get(client.config.welcomeChannel); //mod channel
        var log = interaction.guild.channels.cache.get(client.config.logChannel);  //logs the stuff
        var target = interaction.options.get('target');
        
        //member id: 909989200378601472
        //untrusted id: 909988798308433920

        if (interaction.channel.id == client.config.welcomeChannel) {
            if (target != null) {
                if (!target.roles.cache.some(role => role.id === '909989200378601472') && target.roles.cache.some(role => role.id === '909988798308433920')) {
                    var logEmbed = new MessageEmbed()
                        .setAuthor(interaction.author.username, interaction.author.avatarURL())
                        .addField('Member approved:', tick + ` **${target} (${target.id}) was approved.**`)
                        .setFooter(client.user.username, client.user.avatarURL())
                        .setTimestamp()
                        .setColor("#FFFFFF");

                    let trusted = (await client.trusted.get(userID)) || {};

                    await target.roles.add('909989200378601472');
                    await target.roles.remove('909988798308433920');
                    trusted.joinDate = new Date();
                    await client.trusted.update(trusted);
                    await channel.send({
                        embeds: [logEmbed]
                    })
                    await log.send({
                        embeds: [logEmbed]
                    })
                } else {
                    interaction.reply('this user has either already been approved or has not accepted our rules prompt.');
                }
            } else {
                interaction.reply("target not found! Usage: `!approve [user ID]`\n*Be sure you've correctly copied the user's ID and you're not mentioning them!*");
            }
        } else {
            interaction.reply("wrong channel!");
        }
	},
};