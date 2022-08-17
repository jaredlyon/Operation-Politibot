const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_INTEGRATIONS,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGES,] });

// commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// databases
client.startDatabase = async function () {
	client.r = require("rethinkdbdash")({
		port: client.config.rethink.port,
		host: client.config.rethink.ip,
		user: client.config.rethink.username,
		password: client.config.rethink.password,
		silent: false
	});
	console.log("Successfully established database connection.");
	await client.syncDatabase();
}

//rethinkdb 
client.syncDatabase = async function () {
	try {
		client.r.dbCreate("opbot");
	} catch (err) { }

	client.bank = client.r.db("opbot").table("bank");
	console.log("[BANK] OpBot has successfully connected to bank database!");
	client.streaks = client.r.db("opbot").table("streaks");
	console.log("[STREAKS] OpBot has successfully connected to streak database!");
	client.cooldowns = client.r.db("opbot").table("cooldowns");
	console.log("[COOLDOWNS] OpBot has successfully connected to cooldown database!");
	client.trusted = client.r.db("opbot").table("trusted");
	console.log("[MEMBER TRACKING] OpBot has successfully connected to trusted member database!");
}

//logs
client.syncLogs = function () {
	console.logs = require('./logs.json');

	writeLogs();

	setInterval(function () {
		writeLogs();
	}, 10000);

	function writeLogs() {
		var logsJson = fs.readFileSync("./logs.json"),
			logsParsed = JSON.parse(logsJson)
		if (JSON.stringify(logsParsed) == JSON.stringify(console.logs)) return; // Only writes if there's a difference

		fs.writeFileSync("./logs.json", JSON.stringify(console.logs, null, 3));
		console.log("[LOGS] | Moderation logs successfully saved to file!")
		return "Moderation logs successfully saved to file!";
	}
}

//case count
client.syncCaseNum = function () {
	client.caseNum = require('./caseNum.json');

	writeCaseNum();

	setInterval(function () {
		writeCaseNum();
	}, 10000);

	function writeCaseNum() {
		var caseNumJson = fs.readFileSync("./caseNum.json"),
			caseNumParsed = JSON.parse(caseNumJson)
		if (JSON.stringify(caseNumParsed) == JSON.stringify(client.caseNum)) return; // Only writes if there's a difference

		fs.writeFileSync("./caseNum.json", JSON.stringify(client.caseNum, null, 3));
		console.log("[CASE COUNT] | Case count successfully saved to file!")
		return "Case count successfully saved to file!";
	}
}

//automute
client.syncAutoMute = function () {
	client.autoMute = require('./automute.json');

	client.users.cache.forEach(user => {
		if (!client.autoMute[user.id] && !user.bot) {
			client.autoMute[user.id] = {
				spamCount: 0,
				filterCount: 0
			}
		}
	})

	writeAutoMute();

	setInterval(function () {
		writeAutoMute();
	}, 10000);

	function writeAutoMute() {
		var autoMuteJson = fs.readFileSync("./automute.json"),
			autoMuteParsed = JSON.parse(autoMuteJson)
		if (JSON.stringify(autoMuteParsed) == JSON.stringify(client.autoMute)) return; // Only writes if there's a difference

		fs.writeFileSync("./automute.json", JSON.stringify(client.autoMute, null, 3));
		console.log("[AUTO MUTE] | AutoMute successfully saved to file!")
		return "AutoMute successfully saved to file!";
	}
}

//msgcounts
client.syncMsgCount = function () {
	client.msgCount = require('./msgCount.json');

	client.users.cache.forEach(user => {
		if (!client.msgCount[user.id] && !user.bot) {
			client.msgCount[user.id] = {
				count: 0,
				lastMessage: null
			}
		}
	})

	writeMsgCount();

	setInterval(function () {
		writeMsgCount();
	}, 60000);

	function writeMsgCount() {
		var msgCountJson = fs.readFileSync("./msgCount.json"),
			msgCountParsed = JSON.parse(msgCountJson)
		if (JSON.stringify(msgCountParsed) == JSON.stringify(client.msgCount)) return; // Only writes if there's a difference

		fs.writeFileSync("./msgCount.json", JSON.stringify(client.msgCount, null, 3));
		console.log("[COUNTS] | Message counts successfully saved to file!")
		return "Message counts successfully saved to file!";
	}
}

/*
// timers
var bump;
client.on('ready', () => {
	bump = client.channels.cache.get('886728064086708234'); // Channel to send notification
});

var bumpReminder = new MessageEmbed()
    .setColor('#fafafa')
    .setTitle('<:upvote:877990048438550538>  Bump Reminder!')
    .setDescription('Its time to bump the server! See the links below:')
    .addFields(
        { name: '<:discordme:899100819926974485> Discord.me', value: 'https://discord.me/operationpolitics - Every 6h' },
        { name: '<:disboard:899100807562133554> Disboard', value: 'https://disboard.org/server/760275642150420520 - use !d bump'},
        { name: '<:discords:899100797571317830> Discords.com', value: 'https://discords.com/servers/operationpolitics - Every 6h'},
        { name: '<:topgg:899100785902755841> Top.gg', value: 'https://top.gg/servers/760275642150420520 - every 12h'},
        { name: '<:discordservers:899100776364933180> DiscordServers', value: 'https://discordservers.com/server/760275642150420520/bump - every 12h'},
    )
    .setFooter(`If any site is down or the links don't work, let other bumpers know!`);

const TARGET_HOUR_B1 = 2;
const TARGET_MINUTE_B1 = 00;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_B1 || d2.getHours() !== TARGET_HOUR_B1) return; // Return if current minute is not the notify minute
	bump.send('<@&886727925674676264>')
	bump.send(bumpReminder)
}, 60 * 1000); // Check every minute

const TARGET_HOUR_B2 = 8;
const TARGET_MINUTE_B2 = 00;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_B2 || d2.getHours() !== TARGET_HOUR_B2) return; // Return if current minute is not the notify minute
	bump.send('<@&886727925674676264>')
	bump.send(bumpReminder)
}, 60 * 1000); // Check every minute

const TARGET_HOUR_B3 = 14;
const TARGET_MINUTE_B3 = 00;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_B3 || d2.getHours() !== TARGET_HOUR_B3) return; // Return if current minute is not the notify minute
	bump.send('<@&886727925674676264>')
	bump.send(bumpReminder)
}, 60 * 1000); // Check every minute

const TARGET_HOUR_B4 = 20;
const TARGET_MINUTE_B4 = 00;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_B4 || d2.getHours() !== TARGET_HOUR_B4) return; // Return if current minute is not the notify minute
	bump.send('<@&886727925674676264>')
	bump.send(bumpReminder)
}, 60 * 1000); // Check every minute

// anti-spam
//anti spam
const usersMap = new Map();
const LIMIT = 5;
const DIFF = 5000;

client.on('messageCreate', async(msg) => {
	if (msg.author.bot) return;
	
	if (usersMap.has(msg.author.id)) {
		const userData = usersMap.get(msg.author.id);
		const { lastMessage, timer } = userData;
		const difference = msg.createdTimestamp - lastMessage.createdTimestamp;
		let msgCount = userData.msgCount;
		console.log(difference);

		if (difference > DIFF) {
			clearTimeout(timer);
			console.log('[SPAM] | Reset Spam Timer');
			userData.msgCount = 1;
			userData.lastMessage = msg;
			userData.timer = setTimeout(() => {
				usersMap.delete(msg.author.id);
				console.log('[SPAM] | User removed from map!')
			}, DIFF);
			usersMap.set(msg.author.id, userData)
		} else {
			++msgCount;
			if(parseInt(msgCount) === LIMIT) {

			msg.reply("Warning: Spam filter triggered!");
			msg.channel.bulkDelete(LIMIT);

			client.autoMute[msg.author.id].spamCount++;

			if (client.autoMute[msg.author.id].spamCount == 3) {
				client.autoMute[msg.author.id].spamCount = 0;

				var log = msg.guild.channels.cache.get(client.config.logChannel);
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
					.addField('Reason:', 'Triggered spam filter excessively.')
					.setFooter(client.user.username, client.user.avatarURL())
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
			
			} else {
				userData.msgCount = msgCount;
				usersMap.set(msg.author.id, userData);
			}
		}
	} else {
		let fn = setTimeout(() => {
			usersMap.delete(msg.author.id);
			console.log('[SPAM] | User removed from map!')
		}, DIFF);
		usersMap.set(msg.author.id, {
			msgCount: 1,
			lastMessage : msg,
			timer : fn
		});
	}
})
*/

client.login(token);