const { MessageEmbed, Message } = require("discord.js");

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		/*
		if (message.channel.type === "dm" && message.author.id == client.user.id) {
			console.log("[DM] " + client.user.username + " -> " + message.channel.recipient.username + " | " + message.content)
		} else if (message.channel.type === "dm" && message.author.id != client.user.id) {
			console.log("[DM] " + message.channel.recipient.username + " -> " + client.user.username + " | " + message.content)
		}
	
		if (!message.channel.type === "text" || !message.guild || message.author.client) return;
	
		client.processMessage(message);
	
		//reply array shenanigans
		const responseObject = {
			"go bells": "go bells!"
		};
		if (responseObject[message.content.toLowerCase()]) {
			message.channel.send(responseObject[message.content.toLowerCase()]);
		}
	
		if (message1.includes("input")) {
			message.channel.send("output");
		}
		
		
		//mass ping
		var massPingUserID = message.author.id;
		let massPingMember = message.guild.members.cache.get(massPingUserID);
		if (message.mentions.users.size >= 4 && !(massPingMember.roles.cache.some(role => role.id === '854841000480079882') || massPingMember.roles.cache.some(role => role.id === '927318500614225920') || massPingMember.roles.cache.some(role => role.id === '775501181212295239') || massPingMember.roles.cache.some(role => role.id === '893189360105689139'))) {
			message.delete();
			message.reply("do not mass ping!")
		}
		
		//for banned words
		if (message1.includes("darky") || message1.includes("darkey") || message1.includes("darkie") || message1.includes("tranny") || message1.includes("nibba") || message1.includes("nigg") || message1.includes("nigger") || message1.includes("n1gg") || message1.includes("chink") || message1.includes("ch1nk") || message1.includes("ch1nc") || message1.includes("chinc") || message1.includes("sp1c") || message1.includes("sp1k") || message1.includes("nigga") || message1.includes("n1gga") || message1.includes("negro") || message1.includes("n3g") || message1.includes("n3gr0") || message1.includes("retard") || message1.includes("r3t4rd") || message1.includes("re tard") || message1.includes("re tarded") || message1.includes("r etard") || message1.includes("ret ard") || message1.includes("reta rd") || message1.includes("retar d") || message1.includes("spic ") || message1 == "spic" || message1.includes("fag") || message1.includes("fagot") ||message1.includes("faggot") || message1.includes("f4g0t") || message1.includes("f4g") || message1.includes("f4gg0t") || message1.includes("lourigan") || message1.includes("pushing p") || message1.includes("lurigan") || message1.includes("pushin p") || message1.includes("lorigan") || message1.includes("l0r1gan") || message1.includes("l0urigan") || message1.includes("lour1gan")) {
			message.reply("word filter triggered!");
			message.delete();
	
			client.autoMute[message.author.id].filterCount++;
	
			if (client.autoMute[message.author.id].filterCount == 3) {
				client.autoMute[message.author.id].filterCount = 0;
	
				var log = message.guild.channels.cache.get(client.config.logChannel);
				let role = message.guild.roles.cache.get("849498583102914581");
				var userID = message.author.id;
				let member = message.guild.members.cache.get(userID);

				member.timeout(10*60*1000, "Filter")
	
				var mute = new MessageEmbed()
					.setAuthor(member.user.username, member.user.avatarURL())
					.addField('Member auto-muted (10 mins):', `**:mute: ${member} (${member.id}).**`)
					.addField('Reason:', 'Triggered word filter excessively.')
					.setFooter(client.user.username, client.user.avatarURL())
					.setTimestamp()
					.setColor("#992D22");
				
				message.channel.send({
					embeds: [mute]
				});
				log.send({
					embeds: [mute]
				});
				log.send("<@&893189360105689139> <@&854841000480079882> <@&927318500614225920> <@&895051017828311100> **Auto-Mute triggered!!**");
			}
		}
		*/
	
		//reply array
		const message1 = message.content.toLowerCase();
		if (message1.includes("lets go brandon")) {
			message.channel.send(":clown:");
		}
		if (message1.includes("lets go, brandon")) {
			message.channel.send(":clown:");
		}
		if (message1.includes("let's go brandon")) {
			message.channel.send(":clown:");
		}
		if (message1.includes("let's go, brandon")) {
			message.channel.send(":clown:");
		}
		if (message1.includes("socialism is when")) {
			message.channel.send("https://www.youtube.com/watch?v=rgiC8YfytDw");
		}
	
		//staff voting
		const upvote = client.emojis.cache.find(emoji => emoji.name == "upvote");
		const neutralvote = client.emojis.cache.find(emoji => emoji.name == "neutralvote");
		const downvote = client.emojis.cache.find(emoji => emoji.name == "downvote");
		if (message.channel.id == '927365081371652137') {
			await message.react(upvote);
			await message.react(neutralvote);
			await message.react(downvote);
		}
	
		//bank writes
		let account = (await client.bank.get(message.author.id)) || {};
		if (!account) {
			account.id = message.author.id;
			account.balance = 5.00;
			account.lastMessage = new Date();
			console.log("[BANK] Created new account for " + message.author.username + "!");
			await client.bank.insert(account);
		} else {
			if (new Date() - new Date(account.lastMessage) >= 600*1000) {
				account.balance += 5.00;
				account.lastMessage = new Date();
				console.log("[BANK] Logged passive income for " + message.author.username + "!");
				await client.bank.update(account);
			}
		}
	
		//spam table update writes
		if (!client.autoMute[message.author.id]) {
			client.autoMute[message.author.id] = {
				spamCount: 0,
				filterCount: 0
			}
		}
	
		//score writes
		if (!client.msgCount[message.author.id]) {
			client.msgCount[message.author.id] = {
				count: 0,
				lastMessage: new Date()
			}
			console.log("[COUNTS] New message count logged for " + message.author.username + ".");
		} else {
			if (new Date() - new Date(client.msgCount[message.author.id].lastMessage) >= 5000) {
				client.msgCount[message.author.id].count++;
				client.msgCount[message.author.id].lastMessage = new Date();
				console.log("[COUNTS] Message count logged for " + message.author.username + ".");
			}
		}
	
		//role changes
		if (message.member) {
			var userID = message.member.id;
			let member = message.member;
			let trusted = (await client.trusted.get(message.author.id)) || {};
		
			if (member.roles.cache.some(role => role.id === '909989200378601472') && new Date() - trusted.joinDate >= 1209600000 && client.msgCount[userID].count > 300) {
				let memberRole = message.guild.roles.cache.get("909989200378601472");
				let trustedRole = message.guild.roles.cache.get("775838439538425866");
				member.roles.add(trustedRole);
				member.roles.remove(memberRole);
				console.log("[MEMBER TRACKING] " + message.author + " became a trusted member!");
				message.reply("You have become a trusted member! You can now send message embeds and files to the server.");
			} else if (member.roles.cache.some(role => role.id === '909989200378601472')) {
				console.log("[MEMBER TRACKING] " + message.author + " sent a message but was ineligible for trusted status.");
			}
			
			//grab activity roles
			let internRole = message.guild.roles.cache.get("950846711209816094");
			let activistRole = message.guild.roles.cache.get("950846744562905108");
			let punditRole = message.guild.roles.cache.get("950846792315068416");
			let statesmanRole = message.guild.roles.cache.get("950846854545965076");
			let ambassadorRole = message.guild.roles.cache.get("950846886653337641");
			let presidentialRole = message.guild.roles.cache.get("950846892827377694");
			let constitutionalRole = message.guild.roles.cache.get("950846899106238505");
			if (!member.roles.cache.some(role => role.id === '950846711209816094') && (300 < client.msgCount[message.author.id].count && client.msgCount[message.author.id].count < 750)) {
				member.roles.add(internRole);
				//member.roles.remove(memberRole);
				console.log("[MEMBER TRACKING] " + message.author + " became an intern!");
				message.reply("You have leveled up to the **Intern** activity tier!");
			} else if (!member.roles.cache.some(role => role.id === '950846744562905108') && (750 < client.msgCount[message.author.id].count && client.msgCount[message.author.id].count < 1875)) {
				member.roles.add(activistRole);
				member.roles.remove(internRole);
				console.log("[MEMBER TRACKING] " + message.author + " became an activist!");
				message.reply("You have leveled up to the **Activist** activity tier!");		
			} else if (!member.roles.cache.some(role => role.id === '950846792315068416') && (1875 < client.msgCount[message.author.id].count && client.msgCount[message.author.id].count < 3750)) {
				member.roles.add(punditRole);
				member.roles.remove(activistRole);
				console.log("[MEMBER TRACKING] " + message.author + " became a pundit!");
				message.reply("You have leveled up to the **Pundit** activity tier!");		
			} else if (!member.roles.cache.some(role => role.id === '950846854545965076') && (3750 < client.msgCount[message.author.id].count && client.msgCount[message.author.id].count < 7500)) {
				member.roles.add(statesmanRole);
				member.roles.remove(punditRole);
				console.log("[MEMBER TRACKING] " + message.author + " became a statesman!");
				message.reply("You have leveled up to the **Statesman** activity tier!");		
			} else if (!member.roles.cache.some(role => role.id === '950846886653337641') && (7500 < client.msgCount[message.author.id].count && client.msgCount[message.author.id].count < 15000)) {
				member.roles.add(ambassadorRole);
				member.roles.remove(statesmanRole);
				console.log("[MEMBER TRACKING] " + message.author + " became an ambassador!");
				message.reply("You have leveled up to the **Ambassador** activity tier!");		
			} else if (!member.roles.cache.some(role => role.id === '950846892827377694') && (15000 < client.msgCount[message.author.id].count && client.msgCount[message.author.id].count < 30000)) {
				member.roles.add(presidentialRole);
				member.roles.remove(ambassadorRole);
				console.log("[MEMBER TRACKING] " + message.author + " became a president!");
				message.reply("You have leveled up to the **Presidential** activity tier!");		
			} else if (!member.roles.cache.some(role => role.id === '950846899106238505') && client.msgCount[message.author.id].count > 30000) {
				member.roles.add(constitutionalRole);
				member.roles.remove(presidentialRole);
				console.log("[MEMBER TRACKING] " + message.author + " became a constituional author!");
				message.reply("You have leveled up to the **Constitutional Author** activity tier!");		
			}
		}
	},
};