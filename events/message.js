exports.run = async (bot, msg) => {
	if (msg.channel.type === "dm" && msg.author.id == bot.user.id) {
		console.log("[DM] " + bot.user.username + " -> " + msg.channel.recipient.username + " | " + msg.content)
	} else if (msg.channel.type === "dm" && msg.author.id != bot.user.id) {
		console.log("[DM] " + msg.channel.recipient.username + " -> " + bot.user.username + " | " + msg.content)
	}

	if (!msg.channel.type === "text" || !msg.guild || msg.author.bot) return;

	bot.processMessage(msg);

	//reply array shenanigans
	const responseObject = {
		"go bells": "go bells!"
	};
	if (responseObject[msg.content.toLowerCase()]) {
		msg.channel.send(responseObject[msg.content.toLowerCase()]);
	}

	/** 
	const msg1 = msg.content.toLowerCase();
	if (msg1.includes("input")) {
		msg.channel.send("output");
	}
	*/
	
	
	//for banned words
	const msg1 = msg.content.toLowerCase();
	if (msg1.includes("nigg") || msg1.includes("nigger") || msg1.includes("n1gg") || msg1.includes("chink") || msg1.includes("ch1nk") || msg1.includes("ch1nc") || msg1.includes("chinc") || msg1.includes("sp1c") || msg1.includes("sp1k") || msg1.includes("nigga") || msg1.includes("n1gga") || msg1.includes("negro") || msg1.includes("n3g") || msg1.includes("n3gr0") || msg1.includes("retard") || msg1.includes("r3t4rd") || msg1.includes("re tard") || msg1.includes("re tarded") || msg1.includes("r etard") || msg1.includes("ret ard") || msg1.includes("reta rd") || msg1.includes("retar d") || msg1.includes("spic ") || msg1 == "spic" || msg1.includes("fag") || msg1.includes("fagot") ||msg1.includes("faggot") || msg1.includes("f4g0t") || msg1.includes("f4g") || msg1.includes("f4gg0t")) || msg1.includes("lourigan") || msg1.includes("pushing p") || msg1.includes("lurigan") || msg1.includes("pushin p") || msg1.includes("lorigan") || msg1.includes("l0r1gan") || msg1.includes("l0urigan") || msg1.includes("lour1gan") || msg1.includes("🇵") {
		msg.reply("word filter triggered!");
		msg.delete();
	}

	//reply array
	if (msg1.includes("lets go brandon")) {
		msg.channel.send(":clown:");
	}
	if (msg1.includes("lets go, brandon")) {
		msg.channel.send(":clown:");
	}
	if (msg1.includes("let's go brandon")) {
		msg.channel.send(":clown:");
	}
	if (msg1.includes("let's go, brandon")) {
		msg.channel.send(":clown:");
	}

	//staff voting
	const upvote = bot.emojis.cache.find(emoji => emoji.name == "upvote");
	const neutralvote = bot.emojis.cache.find(emoji => emoji.name == "neutralvote");
	const downvote = bot.emojis.cache.find(emoji => emoji.name == "downvote");
	if (msg.channel.id == '927365081371652137') {
		await msg.react(upvote);
		await msg.react(neutralvote);
		await msg.react(downvote);
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
