exports.run = async (bot, msg) => {
	if (msg.channel.type === "dm" && msg.author.id == bot.user.id) {
		console.log("[DM] " + bot.user.username + " -> " + msg.channel.recipient.username + " | " + msg.content)
		bot.channels.fetch(bot.config.logChannel).send(`The message: "${msg.content || "(no content)"}" by **${msg.author.tag}** was sent to me by another bot (or myself)!`)
	} else if (msg.channel.type === "dm" && msg.author.id != bot.user.id) {
		console.log("[DM] " + msg.channel.recipient.username + " -> " + bot.user.username + " | " + msg.content)
		bot.channels.fetch(bot.config.logChannel).send(`The message: "${msg.content || "(no content)"}" by **${msg.author.tag}** was sent to me!`)
	}

	if (!msg.channel.type === "text" || !msg.guild || msg.author.bot) return;

	bot.processMessage(msg);

	//reply array shenanigans
	const responseObject = {
		"input": "output"
	};
	if (responseObject[msg.content.toLowerCase()]) {
		msg.channel.send(responseObject[msg.content.toLowerCase()]);
	}

	const msg1 = msg.content.toLowerCase();
	if (msg1.includes("input")) {
		msg.channel.send("output");
	}
	
    //for banned words (mk2)
    const bannedwords = ["nigg", "nigger", "n1gg", "chink", "ch1nk", "ch1nc", "chinc", "sp1c", "sp1k", "nigga", "negro", "n1gga", "n3g", "n3gr0", "retard", "r3t4rd", "re tard", "re tarded", "r etard", "ret ard", "reta rd", "retar d", "spic", "fag", "faggot", "fagot", "f4g0t", "f4got", "fag0t", "f4g", "f4gg0t"]

    if (msg1.includes(bannedwords)) {
        msg.channel.send(new MessageEmbed()
            .setColor('#e5e5e5')
            .setDescription(`${msg.author.username}, your message included a banned word!`)
            .setFooter(`Please see Rule 6 in <#775838975755681842>, thank you!`)
            .setTimestamp();
        );
        msg.delete();
    }

	//bank writes
	let account = (await bot.bank.get(msg.author.id)) || {};
	if (!account) {
		account.id = msg.author.id;
		account.balance = 5.00;
		account.lastMessage = new Date();
		console.log("Created new account for " + msg.author.username + "!");
		await bot.bank.insert(account);
	} else {
		if (new Date() - new Date(account.lastMessage) >= 600*1000) {
			account.balance += 5.00;
			account.lastMessage = new Date();
			console.log("Logged passive income for " + msg.author.username + "!");
			await bot.bank.update(account);
		}
	}
}
