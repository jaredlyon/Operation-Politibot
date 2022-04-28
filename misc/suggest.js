var Discord = require('discord.js');

module.exports = {
    name: "suggest",
    permission: 1,
    main: async function (bot, msg) {
        const yup = bot.emojis.cache.find(emoji => emoji.name == "tickmark").toString();
        const nope = bot.emojis.cache.find(emoji => emoji.name == "crossmark").toString();
        const up = bot.emojis.cache.find(emoji => emoji.name == "upvote").toString();
        const down = bot.emojis.cache.find(emoji => emoji.name == "downvote").toString();
        const neut = bot.emojis.cache.find(emoji => emoji.name == "neutralvote").toString();
        var log = msg.guild.channels.cache.get(bot.config.logChannel);
        const args = msg.content.slice(0).trim().split(/ +/g);
        var reason = args.splice(0).join(' ');
        if (reason === '') {
            reason = 'No text was specified.'
        };

        //suggestions channel: 965271666684985454
        var sendChannel = msg.guild.channels.cache.get('965271666684985454');
        //ray channel: 775494762216161341
        var rayChannel = msg.guild.channels.cache.get('775494762216161341');
        //staff channel: 893189722887839797
        var staffChannel = msg.guild.channels.cache.get('893189722887839797');

        let initEmbed = await msg.channel.send({
            embed: {
                color: 0x33cc33,
                author: {
                    name: 'Suggestion from ' + msg.author.username,
                    icon_url: msg.author.avatarURL(),
                },
                description: "*" + reason + "*\n" + yup + " to submit / " + nope + " to delete",
                timestamp: new Date()
            }
        }).then(async function (message) {
            await message.react(yup)
            await message.react(nope)
            return message;
        });

        let initFilter = (reaction, user) =>
        (reaction.emoji.name === 'tickmark' || reaction.emoji.name === 'crossmark') &&
        user.id === msg.author.id;
  
        let initCollector = initEmbed.createReactionCollector(initFilter, {
            time: 1000 * 60 * 3
        });

        var initTimeout = true;
    
        initCollector.on("collect", async messageReaction => {
            if (messageReaction.emoji.name === 'tickmark') {
                msg.reply('your suggestion has been submitted for review.')
                //await staffChannel.send("<@178689418415177729>")
                let rayEmbed = await staffChannel.send({
                    embed: {
                        color: 0x33cc33,
                        author: {
                            name: 'Suggestion from ' + msg.author.username,
                            icon_url: msg.author.avatarURL(),
                        },
                        description: "*" + reason + "*\n\n" + yup + " to approve / " + nope + " to deny",
                        timestamp: new Date()
                    }
                }).then(async function (message) {
                    await message.react(yup)
                    await message.react(nope)
                    return message;
                });

                let nextFilter = (reaction, user) =>
                (reaction.emoji.name === 'crossmark' || reaction.emoji.name === 'tickmark') &&
                (user.id === '178689418415177729' || user.id === '233325738013491200' || user.id === '133350262420013056' || user.id === '202165686607282176' || user.id === '213534403459022848');
          
                let nextCollector = rayEmbed.createReactionCollector(nextFilter, {
                    time: 1000 * 24 * 60 * 60
                });

                var nextTimeout = true;

                nextCollector.on("collect", async messageReaction => {
                    if (messageReaction.emoji.name === 'tickmark') {
                        msg.reply('your earlier suggestion was approved and will be shown in #suggestions.')
                        await sendChannel.send({
                            embed: {
                                color: 0x33cc33,
                                author: {
                                    name: 'Suggestion from ' + msg.author.username,
                                    icon_url: msg.author.avatarURL(),
                                },
                                description: "*" + reason + "*\n\n" + up + " to upvote / " + neut + " to abstain / " + down + " to downvote",
                                timestamp: new Date()
                            }
                        }).then(async function (message) {
                            await message.react(up)
                            await message.react(neut)
                            await message.react(down)
                            return message;
                        });

                        nextTimeout = false;
                    } else if (messageReaction.emoji.name === 'crossmark') {
                        msg.reply('your earlier suggestion was rejected and will not be shown in #suggestions.')

                        nextTimeout = false;
                        nextCollector.stop();
                    }
                });

                nextCollector.on("end", async collected => {
                    if (nextTimeout) {
                        rayChannel.send('Above suggestion timed out.')
                    }
                });

                initTimeout = false;
            } else if (messageReaction.emoji.name === 'crossmark') {
                msg.reply("suggestion deleted!")

                initTimeout = false;
                initCollector.stop();
            }
        });

        initCollector.on("end", async collected => {
            if (initTimeout) {
                msg.reply('your suggestion timed out.')
            }
        });
    }
}