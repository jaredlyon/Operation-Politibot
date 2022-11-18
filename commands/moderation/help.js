const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "help",
    description: "Replies with bot help!",
    options: [],
	run: async(client, interaction) => {

        // generate help embed
		const help = {
            color: '#ffffff',
            title: '🖥️  Operation Politibot Help',
            fields: [
                {
                    name: "/ping",
                    value: "Pings the Politibot API!",
                    inline: false, 
                },
                {
                    name: "/rep {upvote | downvote} {user}",
                    value: "Upvote or downvote a user for good/bad faith interaction!\nUse `/rep help` for more information.",
                    inline: false, 
                },
                {
                    name: "/report {reason}",
                    value: "Send a report straight to staff in case something fishy is going on.\nBe sure to include relevant message links to ensure a more thorough review!",
                    inline: false, 
                },
                {
                    name: "/suggest {suggestion}",
                    value: "Send a server suggestion directly to the owners, who will either approve or deny your request. Approval means that your idea will be shown in <#965271666684985454> where everyone can vote on your idea!",
                    inline: false, 
                },
                {
                    name: "/userinfo {user}",
                    value: "Retrieve information about yourself or a fellow server member!",
                    inline: false, 
                },
            ]
        };

        // send embed back to user
        interaction.reply({ embeds: [help], ephemeral: true })
	},
};