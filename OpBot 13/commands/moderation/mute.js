const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	"name": "mute",
    "description": "Mutes a user",
    "options": [
        {
        "type": 6,
        "name": "mutee",
        "description": "The user to be muted",
        "required": true
        },
        {
        "type": 4,
        "name": "length",
        "description": "Mute length in minutes"
        },
        {
        "type": 3,
        "name": "reason",
        "description": "The reason for issue"
        }
    ],
    run: async(client, interaction) => {
        var log = interaction.guild.channels.cache.get(client.config.logChannel);
        var caseCount = client.caseNum.count;
        var mutee = interaction.options.get('mutee');
        var reason = interaction.options.get('reason');
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        var mute = new MessageEmbed()
            .setAuthor(mutee.username, mutee.avatarURL())
            .addField(`Member muted for ${length}m:`, `**:mute: ${mutee} (${mutee.id}).**`)
            .addField('Reason:', reason)
            .addField('Case ID: ', caseCount)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#E74C3C");

        //await interaction.guild.members.ban(mutee);
        var dm = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setTitle(`**A moderator has muted you for ${length}m:. You may appeal the decision through Modmail.**`)
            .addField('Reason:', reason)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#E74C3C");

        
        member.timeout(length*60*1000, reason)

        await interaction.channel.send({
            embeds: [mute]
        });
        await log.send({
            embeds: [mute]
        });

        client.logs[caseCount] = {
            caseNum: caseCount,
            userid: mutee.id,
            moderatorid: interaction.author.id,
            date: new Date(),
            type: "Mute (" + length + "m)",
            reason: reason
        }

        client.caseNum.count++;

        await mutee.createDM();
        await mutee.send({
            embeds: [dm]
        }).catch(async err => {
            console.log(err);
            interaction.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
        });
	},
};