var Discord = require('discord.js');

exports.run = async (bot, member) => {
    var channel = member.guild.channels.cache.get(bot.config.logChannel);
    var join = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.avatarURL())
        .setFooter(member.guild.name)
        .setTimestamp()
        .setTitle('Member joined!')
        .setColor(`#fafafa`);

    channel.send({
        embed: join
    })

    var joinEmbed = new Discord.MessageEmbed()
        .setColor('#fafafa')
        .setTitle('Welcome to Operation Politics!')
        .setDescription('We are a public political debate and discussion server designed to help you interact with new perspectives and ideas across the political spectrum. Our goal is to facilitate a friendly, open, and diverse platform to share your thoughts and have productive discussions with people across the United States and the world.')
        .addFields(
            { name: `:pushpin:  Check out our rules!"`, value: `You can find our rules in <#775838975755681842>! It's important to read them and abide by them. As a note, we enforce a two-week no-tolerance policy on new members, meaning your first rule violation within two weeks of joining can result in an immediate ban at the discretion of the Moderation Team.`},
            { name: `\u200B`, value: `\u200B`},
            { name: `:newspaper:  Get up to date with news and politics!`, value: `Check out our news channel at <#775837560651120640> or our Twitter Account at <#849863224467259392>`},
            { name: `\u200B`, value: `\u200B`},
            { name: `:ballot_box:  Make your identity known!`, value: `We enjoy when new users get roles to identify themselves, check out the link in <#775494657051197491>!`},
            { name: `\u200B`, value: `\u200B`},
            { name: `:microphone2:  Check out our podcast!`, value: `We run a weekly Podcast to discuss major issues facing our society today. Check <#893205436063449118> for more information!`},
        )
        .setFooter(`If you have any questions about our server, do not be afraid to reach out to 𝓻𝓪𝔂#4390 for help, or any Moderator or Server Staff.`);
    member.createDM();
    member.send(joinEmbed);

    await bot.bank.insert({
        id: member.user.id,
        balance: 0,
        bank: 500,
        lastMessage: null,
    })

    await bot.streaks.insert({
        id: member.user.id,
        lastDaily: null,
        streak: 0,
    })

    console.log("[BANK] | Created new account for " + member.user.username + "!")
}
