var Discord = require('discord.js');

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
	
	//mass ping
	var massPingUserID = msg.author.id;
	let massPingMember = msg.guild.members.cache.get(massPingUserID);
	if (msg.mentions.users.size >= 4 && !(massPingMember.roles.cache.some(role => role.id === '854841000480079882') || massPingMember.roles.cache.some(role => role.id === '927318500614225920') || massPingMember.roles.cache.some(role => role.id === '775501181212295239') || massPingMember.roles.cache.some(role => role.id === '893189360105689139'))) {
		msg.delete();
		msg.reply("do not mass ping!")
	}
	
	//for banned words
	const msg1 = msg.content.toLowerCase();
	if (msg1.includes("darky") || msg1.includes("darkey") || msg1.includes("darkie") || msg1.includes("tranny") || msg1.includes("nibba") || msg1.includes("nigg") || msg1.includes("nigger") || msg1.includes("n1gg") || msg1.includes("chink") || msg1.includes("ch1nk") || msg1.includes("ch1nc") || msg1.includes("chinc") || msg1.includes("sp1c") || msg1.includes("sp1k") || msg1.includes("nigga") || msg1.includes("n1gga") || msg1.includes("negro") || msg1.includes("n3g") || msg1.includes("n3gr0") || msg1.includes("retard") || msg1.includes("r3t4rd") || msg1.includes("re tard") || msg1.includes("re tarded") || msg1.includes("r etard") || msg1.includes("ret ard") || msg1.includes("reta rd") || msg1.includes("retar d") || msg1.includes("spic ") || msg1 == "spic" || msg1.includes("fag") || msg1.includes("fagot") ||msg1.includes("faggot") || msg1.includes("f4g0t") || msg1.includes("f4g") || msg1.includes("f4gg0t") || msg1.includes("lourigan") || msg1.includes("pushing p") || msg1.includes("lurigan") || msg1.includes("pushin p") || msg1.includes("lorigan") || msg1.includes("l0r1gan") || msg1.includes("l0urigan") || msg1.includes("lour1gan")) {
		msg.reply("word filter triggered!");
		msg.delete();

		bot.autoMute[msg.author.id].filterCount++;

		if (bot.autoMute[msg.author.id].filterCount == 3) {
			bot.autoMute[msg.author.id].filterCount = 0;

			var log = msg.guild.channels.cache.get(bot.config.logChannel);
			let role = msg.guild.roles.cache.get("849498583102914581");
			var userID = msg.author.id;
			let member = msg.guild.members.cache.get(userID);
			member.roles.add(role);

			setTimeout(function() {
				member.roles.remove(role);
			}, 10 * 60000);

			var mute = new Discord.MessageEmbed()
				.setAuthor(member.user.username, member.user.avatarURL())
				.addField('Member auto-muted (10 mins):', `**:mute: ${member} (${member.id}).**`)
				.addField('Reason:', 'Triggered word filter excessively.')
				.setFooter(bot.user.username, bot.user.avatarURL())
				.setTimestamp()
				.setColor("#992D22");
			
			msg.channel.send({
				embed: mute
			});
			log.send({
				embed: mute
			});
			log.send("<@&893189360105689139> <@&854841000480079882> <@&927318500614225920> <@&895051017828311100> **Auto-Mute triggered!!**");
		}
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
	if (msg1.includes("socialism is when")) {
		msg.channel.send("https://www.youtube.com/watch?v=rgiC8YfytDw");
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
		console.log("[BANK] Created new account for " + msg.author.username + "!");
		await bot.bank.insert(account);
	} else {
		if (new Date() - new Date(account.lastMessage) >= 600*1000) {
			account.balance += 5.00;
			account.lastMessage = new Date();
			console.log("[BANK] Logged passive income for " + msg.author.username + "!");
			await bot.bank.update(account);
		}
	}

	//spam table update writes
	if (!bot.autoMute[msg.author.id]) {
		bot.autoMute[msg.author.id] = {
			spamCount: 0,
			filterCount: 0
		}
	}

	//score writes
	if (!bot.msgCount[msg.author.id]) {
		bot.msgCount[msg.author.id] = {
			count: 0,
			lastMessage: new Date()
		}
		console.log("[COUNTS] New message count logged for " + msg.author.username + ".");
	} else {
		if (new Date() - new Date(bot.msgCount[msg.author.id].lastMessage) >= 5000) {
			bot.msgCount[msg.author.id].count++;
			bot.msgCount[msg.author.id].lastMessage = new Date();
			console.log("[COUNTS] Message count logged for " + msg.author.username + ".");
		}
	}

    //role changes
    var userID = msg.author.id;
    let member = msg.guild.members.cache.get(userID);
    let trusted = (await bot.trusted.get(msg.author.id)) || {};

    if (member.roles.cache.some(role => role.id === '909989200378601472') && new Date() - trusted.joinDate >= 1209600000 && bot.msgCount[userID].count > 300) {
        let memberRole = msg.guild.roles.cache.get("909989200378601472");
        let trustedRole = msg.guild.roles.cache.get("775838439538425866");
        member.roles.add(trustedRole);
        member.roles.remove(memberRole);
        console.log("[MEMBER TRACKING] " + msg.author + " became a trusted member!");
        msg.reply("you have become a trusted member! You can now send message embeds and files to the server.");
    } else if (member.roles.cache.some(role => role.id === '909989200378601472')) {
        console.log("[MEMBER TRACKING] " + msg.author + " sent a message but was ineligible for trusted status.");
    }
	
	//grab activity roles
	let internRole = msg.guild.roles.cache.get("950846711209816094");
	let activistRole = msg.guild.roles.cache.get("950846744562905108");
	let punditRole = msg.guild.roles.cache.get("950846792315068416");
	let statesmanRole = msg.guild.roles.cache.get("950846854545965076");
	let ambassadorRole = msg.guild.roles.cache.get("950846886653337641");
	let presidentialRole = msg.guild.roles.cache.get("950846892827377694");
	let constitutionalRole = msg.guild.roles.cache.get("950846899106238505");
	if (!member.roles.cache.some(role => role.id === '950846711209816094') && (300 < bot.msgCount[msg.author.id].count && bot.msgCount[msg.author.id].count < 750)) {
		member.roles.add(internRole);
		//member.roles.remove(memberRole);
		console.log("[MEMBER TRACKING] " + msg.author + " became an intern!");
		msg.reply("you have leveled up to the **Intern** activity tier!");
	} else if (!member.roles.cache.some(role => role.id === '950846744562905108') && (750 < bot.msgCount[msg.author.id].count && bot.msgCount[msg.author.id].count < 1875)) {
		member.roles.add(activistRole);
		member.roles.remove(internRole);
		console.log("[MEMBER TRACKING] " + msg.author + " became an activist!");
		msg.reply("you have leveled up to the **Activist** activity tier!");		
	} else if (!member.roles.cache.some(role => role.id === '950846792315068416') && (1875 < bot.msgCount[msg.author.id].count && bot.msgCount[msg.author.id].count < 3750)) {
		member.roles.add(punditRole);
		member.roles.remove(activistRole);
		console.log("[MEMBER TRACKING] " + msg.author + " became a pundit!");
		msg.reply("you have leveled up to the **Pundit** activity tier!");		
	} else if (!member.roles.cache.some(role => role.id === '950846854545965076') && (3750 < bot.msgCount[msg.author.id].count && bot.msgCount[msg.author.id].count < 7500)) {
		member.roles.add(statesmanRole);
		member.roles.remove(punditRole);
		console.log("[MEMBER TRACKING] " + msg.author + " became a statesman!");
		msg.reply("you have leveled up to the **Statesman** activity tier!");		
	} else if (!member.roles.cache.some(role => role.id === '950846886653337641') && (7500 < bot.msgCount[msg.author.id].count && bot.msgCount[msg.author.id].count < 15000)) {
		member.roles.add(ambassadorRole);
		member.roles.remove(statesmanRole);
		console.log("[MEMBER TRACKING] " + msg.author + " became an ambassador!");
		msg.reply("you have leveled up to the **Ambassador** activity tier!");		
	} else if (!member.roles.cache.some(role => role.id === '950846892827377694') && (15000 < bot.msgCount[msg.author.id].count && bot.msgCount[msg.author.id].count < 30000)) {
		member.roles.add(presidentialRole);
		member.roles.remove(ambassadorRole);
		console.log("[MEMBER TRACKING] " + msg.author + " became a president!");
		msg.reply("you have leveled up to the **Presidential** activity tier!");		
	} else if (!member.roles.cache.some(role => role.id === '950846899106238505') && bot.msgCount[msg.author.id].count > 30000) {
		member.roles.add(constitutionalRole);
		member.roles.remove(presidentialRole);
		console.log("[MEMBER TRACKING] " + msg.author + " became a constituional author!");
		msg.reply("you have leveled up to the **Constitutional Author** activity tier!");		
	}

	//muted filter
	if (member.roles.cache.some(role => role.id === '849498583102914581') && msg.channel.parentID != 975542186491912202) {
		msg.delete();
	}
}