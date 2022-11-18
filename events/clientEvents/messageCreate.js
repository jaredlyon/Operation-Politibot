const { MessageEmbed, Message } = require("discord.js");

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {	
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
		if (!message.author.bot) {
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