const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');


module.exports = {
    name: "testbuttons",
    description: "tests the buttons",
    options: [
      {
        type: 7,
        name: "targetchannel",
        description: "The channel to send in",
        required: true
      }
    ],
    run: async(client, interaction) => {

        const cChann = interaction.guild.channels.cache.get('1022374346272030720')
        const tChann = interaction.options.getChannel('targetchannel');

        const buttonTest1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('button1')
                    .setLabel('Press me!')
                    .setStyle('DANGER')
            );

        const buttonTest2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('button2')
                    .setLabel('No, Press Me!')
                    .setStyle('PRIMARY')
            );

        const buttonTest3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel(`Link to Pierce's Chaturbate Rooms`)
                    .setStyle('LINK')
                    .setURL('https://bit.ly/piercecamgirls')
            );

        const buttonTest4 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('button4')
                    .setLabel('Click me for free money')
                    .setStyle('SECONDARY')
            );

        const emebdThing = {
            color: '#992D22',
            description: `Hey, Ray needs some help figuring out how code works because the discord.js docs and support server are more useless than [<@213534403459022848>'s camgirl moderating skills!](https://bit.ly/piercecamgirls) \n\nJust click the button below every now and then — all it does is send a message to a channel (at least in theory) to prove something is working.`
        }

        interaction.reply({
            content: `You sent a message to ${tChann}! Check back here in ${cChann} later for results!`
        });

        tChann.send({
            embeds: [emebdThing],
            components: [buttonTest1, buttonTest2, buttonTest3, buttonTest4],
        });
    },
};