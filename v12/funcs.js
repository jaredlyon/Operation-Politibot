const fs = require("fs");
var channel = null,
	stdin = process.openStdin();
var config = require("./config.json");

module.exports = (bot) => {
	/**
	 * Core message processing functions
	 */

	bot.permLevel = function (msg) {
		if (msg.author.id == bot.config.owner)
			return 4;
		if (msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '854841000480079882') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '927318500614225920') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '775501181212295239') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '893189360105689139'))
			return 2;
		else
			return 1;
	}

	bot.processMessage = function (msg) {
		if (channel && msg.channel.id == channel) bot.log(msg.guild.name + " | " + msg.channel.name + " | " + msg.member.displayName + " | " + msg.cleanContent);

		if (msg.author.bot) return;

		if (msg.content.startsWith(bot.config.prefix)) {
			try {
				msg.args = msg.content.split(/\s+/g)
				msg.content = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length) || null
				var command = msg.args.shift().slice(bot.config.prefix.length).toLowerCase()
				var cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
				var perms = bot.permLevel(msg)
				if (!cmd) return;
				else if (perms < cmd.permission) return msg.reply("you do not have permission to do this!")
				else {
					bot.logCommand(command, msg.content, msg.author.username, msg.channel.name, msg.guild.name)
					try {
						cmd.main(bot, msg);
					} catch (err) {
						msg.channel.send("Oh no! We encountered an error:\n```" + err.stack + "```")
					}
				}
			} catch (err) {
				msg.channel.send("Oh no! We encountered an error:\n```" + err.stack + "```");
				bot.error(err.stack);
			}
		}
	}

	/**
	 * Core bot functions
	 */

	bot.startDatabase = async function () {
		bot.r = require("rethinkdbdash")({
			port: config.rethink.port,
			host: config.rethink.ip,
			user: config.rethink.username,
			password: config.rethink.password,
			silent: false
		});
		bot.log("Successfully established database connection.");
		await bot.syncDatabase();
	}

	//rethinkdb 
	bot.syncDatabase = async function () {
		try {
			bot.r.dbCreate("opbot");
		} catch (err) { }

		bot.bank = bot.r.db("opbot").table("bank");
		bot.log("[BANK] OpBot has successfully connected to bank database!");
		bot.streaks = bot.r.db("opbot").table("streaks");
		bot.log("[STREAKS] OpBot has successfully connected to streak database!");
		bot.cooldowns = bot.r.db("opbot").table("cooldowns");
		bot.log("[COOLDOWNS] OpBot has successfully connected to cooldown database!");
		bot.trusted = bot.r.db("opbot").table("trusted");
		bot.log("[MEMBER TRACKING] OpBot has successfully connected to trusted member database!");
	}

	bot.awaitConsoleInput = function () {
		stdin.addListener("data", function (d) {
			d = d.toString().trim()
			if (d.startsWith("channels")) {
				bot.channels.forEach(channel => {
					if (channel.type == "text" && channel.permissionsFor(channel.guild.me).has(["READ_MESSAGES", "SEND_MESSAGES"]))
						bot.log(channel.guild.name + " | #" + channel.name + " | (" + channel.id + ")")
				})
			} else if (d.startsWith("bind") && channel) {
				d = d.substring(d.indexOf(" ") + 1, d.length)
				if (bot.channels.fetch(d)) {
					channel = d;
					bot.log("Console rebound to channel " + bot.channels.fetch(d).name + " in " + bot.channels.fetch(d).guild.name + "!");
				}
			} else if (channel) {
				try {
					bot.channels.fetch(channel).send(d);
				} catch (err) {
					bot.log(err);
				}
			} else {
				if (bot.channels.fetch(d)) {
					channel = d;
					bot.log("Console bound to channel " + bot.channels.fetch(d).name + " in " + bot.channels.fetch(d).guild.name + "!");
				}
			}
		});
	}

	//logs
	bot.syncLogs = function () {
		bot.logs = require('./logs.json');

		writeLogs();

		setInterval(function () {
			writeLogs();
		}, 10000);

		function writeLogs() {
			var logsJson = fs.readFileSync("./logs.json"),
				logsParsed = JSON.parse(logsJson)
			if (JSON.stringify(logsParsed) == JSON.stringify(bot.logs)) return; // Only writes if there's a difference

			fs.writeFileSync("./logs.json", JSON.stringify(bot.logs, null, 3));
			console.log("[LOGS] | Moderation logs successfully saved to file!")
			return "Moderation logs successfully saved to file!";
		}
	}

	//case count
	bot.syncCaseNum = function () {
		bot.caseNum = require('./caseNum.json');

		writeCaseNum();

		setInterval(function () {
			writeCaseNum();
		}, 10000);

		function writeCaseNum() {
			var caseNumJson = fs.readFileSync("./caseNum.json"),
				caseNumParsed = JSON.parse(caseNumJson)
			if (JSON.stringify(caseNumParsed) == JSON.stringify(bot.caseNum)) return; // Only writes if there's a difference

			fs.writeFileSync("./caseNum.json", JSON.stringify(bot.caseNum, null, 3));
			console.log("[CASE COUNT] | Case count successfully saved to file!")
			return "Case count successfully saved to file!";
		}
	}

	//automute
	bot.syncAutoMute = function () {
		bot.autoMute = require('./automute.json');

		bot.users.cache.forEach(user => {
			if (!bot.autoMute[user.id] && !user.bot) {
				bot.autoMute[user.id] = {
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
			if (JSON.stringify(autoMuteParsed) == JSON.stringify(bot.autoMute)) return; // Only writes if there's a difference

			fs.writeFileSync("./automute.json", JSON.stringify(bot.autoMute, null, 3));
			console.log("[AUTO MUTE] | AutoMute successfully saved to file!")
			return "AutoMute successfully saved to file!";
		}
	}

	//msgcounts
	bot.syncMsgCount = function () {
		bot.msgCount = require('./msgCount.json');

		bot.users.cache.forEach(user => {
			if (!bot.msgCount[user.id] && !user.bot) {
				bot.msgCount[user.id] = {
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
			if (JSON.stringify(msgCountParsed) == JSON.stringify(bot.msgCount)) return; // Only writes if there's a difference

			fs.writeFileSync("./msgCount.json", JSON.stringify(bot.msgCount, null, 3));
			console.log("[COUNTS] | Message counts successfully saved to file!")
			return "Message counts successfully saved to file!";
		}
	}

	/**
	 * Logging functions
	 */

	bot.logCommand = function (command, arguments, user, channel, server) {
		bot.log(`Command Executed: ${command} | User: ${user} | Arguments: ${arguments} | Server: ${server} | Channel: #${channel}`)
	}

	bot.error = function (err) {
		console.log(this.timestamp() + " [ERROR] | " + err.stack)
	}

	bot.debug = function (txt) {
		console.log(this.timestamp() + " [DEBUG] | " + txt)
	}

	bot.warn = function (txt) {
		console.log(this.timestamp() + " [WARN]  | " + txt)
	}

	bot.log = function (txt) {
		console.log(this.timestamp() + "  [LOG]  | " + txt)
	}

	bot.timestamp = function () {
		var currentTime = new Date(),
			hours = currentTime.getHours(),
			minutes = currentTime.getMinutes(),
			seconds = currentTime.getSeconds()
		if (minutes < 10)
			minutes = "0" + minutes;
		if (seconds < 10)
			seconds = "0" + seconds;
		return '[' + hours + ':' + minutes + ':' + seconds + ']';
	}
}