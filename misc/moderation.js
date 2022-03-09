var Discord = require('discord.js');

module.exports = {
    name: "moderation",
    permission: 2,
    main: function (bot, msg) {
        var help = new Discord.MessageEmbed()
            .setColor('#fafafa')
            .setTitle(`:robot:  Operation Politibot Moderation Commands  :robot:`)
            .setDescription(`Names, usage, and descriptions for all staff commands.`)
            .setThumbnail(`https://i.imgur.com/168cewt.jpg`)
            .setFooter(`If you have any questions about Operation Politibot and/or its development, DM 𝓻𝓪𝔂#4390`)
            .addFields(
                { name: `!warn <@user> <reason>`, value: `Warns the targeted user.`},
                { name: `!mute <@user> <length in minutes> <reason>`, value: `Mutes the targeted member; leaving the length argument empty sets an indefinite mute without a timer.`},
                { name: `!unmute <@user>`, value: `Unmutes the targeted user.`},
                { name: `!kick <@user> <reason>`, value: `Kicks the targeted user.`},
                { name: `!ban <@user> <reason>`, value: `Bans the targeted user.`},
                { name: `!logs <user ID>`, value: `Check the moderation history of a given user.`},
                { name: `!case <case ID>`, value: `View a specific moderation case.`},
                { name: `!case <case ID> <edit/rewrite/delete> <input>`, value: `Edit, rewrite, or delete a specific moderation case.`},
                { name: `!userinfo <user ID>`, value: `Returns relevant informations regarding the targeted user.`},
                { name: `!approve <user ID>`, value: `Approves the targeted user for the 'Member' role.`},
                { name: `!demographics`, value: `Returns the server demographics.`},
                { name: `!purge <amount>`, value: `Bulk deletes the specified amount of messages; I *think* the limit is 100, but Discord might have changed it.`},
                { name: `!lockdown`, value: `Locks most public channels by blocking all members from sending messages.`},
                { name: `!unlockdown`, value: `Unlocks all channels.`},
                { name: `!lock`, value: `Locks the channel that the command is used in.`},
                { name: `!unlock`, value: `Unlocks the channel that the command is used in.`},
            );
        
        msg.channel.send(help);
    }
}