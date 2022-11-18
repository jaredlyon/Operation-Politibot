const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "modhelp",
    description: "For moderator use ONLY :angry:",
    options: [
        {
            type: 1,
            name: "logs",
            description: "Shows info on our logging system",
        },
        {
            type: 1,
            name: "punishments",
            description: "Shows info on our smiting system",
        },
        {
            type: 1,
            name: "other",
            description: "Shows info on our other systems",
        },
    ],
	run: async(client, interaction) => {

        // logging system help
        if (interaction.options.getSubcommand() === 'logs') {

            // generate help embed
            const help = {
                color: '#ffffff',
                title: '🖥️  Operation Politibot Moderation Help',
                fields: [
                    {
                        name: "/case view {id}",
                        value: "View a specific case.",
                        inline: false, 
                    },
                    {
                        name: "/case edit {id} {input}",
                        value: "Appends new information to an existing case reason.\nGreat for adding new message links after the initial issuing!",
                        inline: false, 
                    },
                    {
                        name: "/case rewrite {id} {input}",
                        value: "Rewrites a case reason from scratch.",
                        inline: false, 
                    },
                    {
                        name: "/case delete {id}",
                        value: "Deletes a specific case permanently.\nCan only be used by Senior Staff!",
                        inline: false, 
                    },
                    {
                        name: "/logs {user}",
                        value: "View the moderation logs associated with a given user.",
                        inline: false, 
                    },
                ]
            };

            // send embed back to user
            interaction.reply({ embeds: [help], ephemeral: true })

        } else if (interaction.options.getSubcommand() === 'punishments') {

            // generate help embed
            const help = {
                color: '#ffffff',
                title: '🖥️  Operation Politibot Moderation Help',
                fields: [
                    {
                        name: "/ban {user} {reason}",
                        value: "Bans a user.",
                        inline: false, 
                    },
                    {
                        name: "/incident {user} {reason}",
                        value: "Quietly logs an incident for a user.\nGreat for keeping track of instances that may not necessarily violate the rules, but shed important light on a user's general standing.",
                        inline: false, 
                    },
                    {
                        name: "/kick {user} {reason}",
                        value: "Kicks a user.",
                        inline: false, 
                    },
                    {
                        name: "/mute {user} {reason} {OPTIONAL: length (in minutes)}",
                        value: "Mutes a user; you can input a length to specify the duration, but leaving it blank will automatically deliver a 28-day timeout.\n Mutes over 40000 minutes in length will automatically trigger the rules test requirement.",
                        inline: false, 
                    },
                    {
                        name: "/warn {user} {reason}",
                        value: "Warns a user.",
                        inline: false, 
                    },
                ]
            };

            // send embed back to user
            interaction.reply({ embeds: [help], ephemeral: true })
            
        } else if (interaction.options.getSubcommand() === 'other') {

            // generate help embed
            const help = {
                color: '#ffffff',
                title: '🖥️  Operation Politibot Moderation Help',
                fields: [
                    {
                        name: "/approve {user}",
                        value: "Manually approves an unverified member for server access.",
                        inline: false, 
                    },
                    {
                        name: "/lock {OPTIONAL: channel}",
                        value: "Locks a channel.\nLeaving the `channel` argument blank locks the channel that the command was used in.",
                        inline: false, 
                    },
                    {
                        name: "/lockdown",
                        value: "Locks down all public channels.",
                        inline: false, 
                    },
                    {
                        name: "/unlock {OPTIONAL: channel}",
                        value: "Unlocks a channel.\nLeaving the `channel` argument blank unlocks the channel that the command was used in.",
                        inline: false, 
                    },
                    {
                        name: "/unlockdown",
                        value: "Unlocks all public channels.",
                        inline: false, 
                    },
                    {
                        name: "~ Context Menus ~",
                        value: "Right click a message, then go to **Apps**, where you'll find two customized Politibot context menus:\n`How to Cite` - Sends helpful information on how to correctly cite sources during debate\n`Rules Reminder` - Reminds a user of the server rules",
                        inline: false, 
                    },
                ]
            };

            // send embed back to user
            interaction.reply({ embeds: [help], ephemeral: true })
        }
	},
};