const { SlashCommandBuilder } = require('@discordjs/builders');

// module.exports = {
// 	name: "ping",
//     description: "Pings the bot",
//     options: [],
// 	run: async(client, interaction) => {
// 		await interaction.reply('Pong!');
// 	},
// };

module.exports = {
    name: "ping",
    description: "Check the bot's ping!",
    run: async (client, interaction) => {
        const msg = await interaction.channel.send(`🏓 Pinging...`);

        const pingEmbed = new client.discord.MessageEmbed()
            .setTitle(':signal_strength: Bot Ping')
            .addField("Time", `${Math.floor(msg.createdAt - interaction.createdAt)}ms`, true)
            .addField("API Ping", `${client.ws.ping}ms`, true)

        console.log(interaction.constructor.name)

        await interaction.reply({ embeds: [pingEmbed] });

        msg.delete();
    },
};