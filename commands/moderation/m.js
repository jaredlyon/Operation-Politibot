const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
        name: "m",
        description: "sends a neat message somewhere",
        options: [],
        run: async(client, interaction) => {
                await interaction.reply('This commands still under development.');
                /*
                const args = msg.content.slice(2).trim().split(/ +/g);
                const command = args.shift().toLowerCase();

                let message = args.splice(0).join(' ');

                var channel = msg.mentions.channels.first();

                channel.send(message)
                */
        },
};