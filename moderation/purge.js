var Discord = require('discord.js');

module.exports = {
	name: 'purge',
	permission: 1,
	main: function (bot, msg) {
		const rules = bot.emojis.cache.find(emoji => emoji.name == "rules").toString();
        var log = msg.guild.channels.cache.get(bot.config.logChannel);  //logs the stuff

		if (msg.member.hasPermission('MANAGE_MESSAGES') || msg.author.id === require("../config.json").owner) {
			var num = msg.content;
			if (!isNaN(num)) {
				msg.channel.messages.fetch({ limit: num })
					.then(messages => msg.channel.bulkDelete(messages))
					.catch(msg.channel.bulkDelete);

				msg.channel.send(rules + " | Purged " + num + " messages!\nhttps://i.imgur.com/SSiOqrl.gif")

                var logEmbed = new Discord.MessageEmbed()
                        .addField('Purge executed:', rules + ` **${msg.author} purged ` + num + ` messages!**`)
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
	}
};