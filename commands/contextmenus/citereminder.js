const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { ContextMenuInteraction } = require('discord.js');

module.exports = {
    name: 'How to Cite',
    type: 'MESSAGE',
    /**
     * @param {ContextMenuInteraction} interaction 
     */
    run: async (client, interaction) => {
        // fetch constants
        const targetMsg = await interaction.channel.messages.fetch(interaction.targetId);
        const targetUser = await targetMsg.author;

        // generate embed
        const reminderEmbed = {
            color: '#ffffff',
            title: '🔬  Citing Sources and Avoiding Misinformation',
            description: `Hey there, ${targetUser.toString()}!\n\n[This message](${targetMsg.url}) potentially is a misleading source. When you're in a debate and being asked to (or trying on your own volition) to cite a source for a claim you are making or to refute someone else's claim, it's *extremely* important that we make sure we're posting good information. Unreliable or misleading sources are very common on the internet, and while we don't expect everyone to have collegiate-level research abilities, we *do* have an obligation to ensure that everyone is doing their best to post good information here.\n\nThat's not to say you necessarily did anything wrong! This is just a friendly reminder and some tips to help you out in the future.`,
            fields: [
                {
                    name: "🌐  Using Wikipedia as a source",
                    value: "While your middle school teacher did get it wrong that wikipedia is a terrible source, it does tend to have its moments. You should always double check the citations and follow the tips below to make sure they are what you want. Don't try to cite a wikipedia page with inadequate or no citations! You'll usually see a few large banners either at the top of the page or in individual sections telling you that something is inadequately cited.",
                    inline: true,
                },
                {
                    name: "🎓  https://scholar.google.com/",
                    value: "This is easily one of the best places you can go to find high-quality research and sources. You just have to know what to look for! Using Google Scholar is a big cheat both in college and in debating atmospheres because it can allow you to find, bookmark, and sort through lots of research and academic sources without needing access to an academic library. That being said, you should always follow the tips below and make sure you're using good sources.",
                    inline: true,
                },
                {
                    name: "🔍  Tips and Tricks",
                    value: "We couldn't put everything into a single embed because it would be incredibly long. If you're interested in learning about some better habits regarding finding and citing sources and bettering your debating capabilities, click the button below and it'll bring up an ephemeral embed full of them! If you have any questions, several members of our staff team are academics and college students and can help you out if you're not sure.",
                    inline: false,
                },
            ],
            footer: {
                text: `This is just a friendly reminder. Sometimes, posting misleading or unreliable sources can end up in Rule 11 territory, so it's important to be mindful of what you post.`
            }
        };

        // add more info button
        const moreInfoButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('moreinfopls')
                    .setLabel('Tips & Tricks')
                    .setStyle('SUCCESS'),
            );

        // send embed + button
        targetMsg.reply({ content: `${targetUser.toString()}`, embeds: [reminderEmbed], components: [moreInfoButton] });
        
        // replies to user
        interaction.reply({ content: 'Reminder Sent! Thank you for doing your part to keep the server tidy.', embeds: [], components: [], ephemeral: true });
    }
}