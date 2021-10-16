var Discord = require('discord.js');

module.exports = {
	name: 'podcast',
	permission: 1,
	main: function (bot, msg) {
        var podcastEmbed = new Discord.MessageEmbed()
            .setColor('#fafafa')
            .setTitle(`:microphone2:  Operation Politics Podcast  :microphone2:`)
            .setDescription(`We run a weekly podcast to discuss major issues facing our society today. Check out <#893205436063449118> for more information!`)
            .setThumbnail(`https://i.imgur.com/jKEHqWd.png`)
            .setFooter(`If you have any questions about the podcast, check #podcast-info for more information or DM 𝓻𝓪𝔂#4390`)
            .addFields(
                { name: `<:sounder:899044462154625024> Sounder.fm`, value: `https://operation-politics.sounder.fm/`},
                { name: `<:spotify:899043954681597962> Spotify`, value: `https://open.spotify.com/show/2iOwmb5lzsY8xIDXa8Z4Ab`},
                { name: `<:kofi:893202723938398218> Interested in supporting our efforts?`, value: `If you like what you hear and you want to support this server or the podcast, check us out on Ko-fi and consider donating for special perks! https://ko-fi.com/operationpolitics`},
            );

		msg.channel.send(podcastEmbed)
	}
}
