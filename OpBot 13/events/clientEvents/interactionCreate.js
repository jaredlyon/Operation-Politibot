const { RequestManager } = require("@discordjs/rest")
const { CommandInteraction } = require("discord.js")

module.exports = {
    name: 'interactionCreate',

    /**
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 */

    async execute(interaction, client) {
        if (!interaction.isCommand) return;

        if (interaction.isCommand()) {
            const command = client.commandslist.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'Thats not a command you silly goose!' })
    
            const args = [];
    
            for (let option of interaction.options.data) {
                if (option.type === 'SUB_COMMAND') {
                    if (option.name) args.push(option.name);
                    option.options?.forEach(x => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }
    
            try {
                command.run(client, interaction, args)
            } catch (e) {
                interaction.reply({ content: e.message });
            }
        }

        // if (interaction.isSelectMenu()) {
        //     if (interaction.customId === 'menu1') {
        //         await interaction.update() {
        //             if (interaction.values === 'first_option')
        //         }
        //     }
        // }
    }
};