const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
	name: "purge",
    description: "Mass deletes a specified number of messages",
    options: [],
	async execute(interaction) {
		await interaction.reply('This message is still under development, but if you need a purge urgently, let Jared know cuz it should be quick to add.');

		/*
		const tickmark = bot.emojis.cache.find(emoji => emoji.name == "tickmark").toString();
        var log = msg.guild.channels.cache.get(bot.config.logChannel);  //logs the stuff

		if (msg.member.hasPermission('MANAGE_MESSAGES') || msg.author.id === require("../config.json").owner) {
			var num = msg.content;
			if (!isNaN(num)) {
				msg.channel.messages.fetch({ limit: num })
					.then(messages => msg.channel.bulkDelete(messages))
					.catch(msg.channel.bulkDelete);

				msg.channel.send(tickmark + " | Purged " + num + " messages!\nhttps://i.imgur.com/SSiOqrl.gif")

                var logEmbed = new Discord.MessageEmbed()
                        .addField('Purge executed:', tickmark + ` **${msg.author} purged ` + num + ` messages!**`)
						.addField(`Channel:`, `${msg.channel}`)
                        .setFooter(bot.user.username, bot.user.avatarURL())
                        .setTimestamp()
                        .setColor("#E67E22");
                    log.send({
                        embed: logEmbed
                    })

			} else {
				msg.channel.send("Please specify a number!");
			}
		}
		*/
	},
};