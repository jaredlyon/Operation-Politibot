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
	
	//for banned words
	if (msg1.includes("nigg")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("nigger")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("n1gg")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("chink")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("ch1nk")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("ch1nc")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("chinc")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("sp1c")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("sp1k")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("nigga")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("n1gga")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("negro")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("n3g")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("n3gr0")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("retard")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("r3t4rd")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("re tard")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("re tarded")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("r etard")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("ret ard")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("reta rd")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("retar d")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("spic")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("fag")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("fagot")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("faggot")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("f4g0t")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("f4g")) {
		msg.reply("your message included a banned word!");
		msg.delete();
	}
	if (msg1.includes("f4gg0t")) {
		msg.reply("your message included a banned word!");
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