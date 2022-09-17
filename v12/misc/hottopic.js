module.exports = {
    name: "hottopic",
    permission: 1,
    main: async function (bot, msg) {
        const args = msg.content.slice(0).trim().split(/ +/g);
        var input = args.splice(0).join(' ');

        // politics 964239900620759070
        // global politics 928407503690149939
        // srs 775839512914952212
        // phil 951322929898061905
        // hot takes 965272694264311899
        if (msg.channel.id == "965272694264311899" || msg.channel.id == "951322929898061905" || msg.channel.id == "775839512914952212" || msg.channel.id == "928407503690149939" || msg.channel.id == "964239900620759070") {
            if (!(msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '854841000480079882') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '927318500614225920') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '775501181212295239') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '893189360105689139'))) {
                if (new Date() > bot.hotTopic) {
                    const topic = await msg.channel.send({
                        embed: {
                            color: 0x33cc33,
                            author: {
                                name: 'Topic Suggestion from ' + msg.author.username,
                                icon_url: msg.author.avatarURL(),
                            },
                            description: "*" + input + "*\n\n👍 to upvote / 👎 to downvote\n" + "*Five upvotes needed to approve*",
                            timestamp: new Date()
                        }
                    }).then(async function (message) {
                        await message.react('👍')
                        await message.react('👎')
                        return message;
                    });

                    let filter = (reaction, user) =>
                    (reaction.emoji.name === '👍' || reaction.emoji.name === '👎');
            
                    let collector = topic.createReactionCollector(filter, {
                        time: 1000 * 60 * 10
                    });

                    var timeout = true;

                    collector.on("collect", async messageReaction => {
                        if (topic.reactions.cache.get('👍').count == 6) {
                            //msg.channel.setTopic("Current topic: **" + input + "**");
                            msg.channel.send("<@&956223433564385333> **A Hot Topic has been approved for discussion!**");
                            msg.channel.send({
                                embed: {
                                    color: 0x33cc33,
                                    author: {
                                        name: 'Topic from ' + msg.author.username,
                                        icon_url: msg.author.avatarURL(),
                                    },
                                    description: "*" + input + "*",
                                    timestamp: new Date()
                                }
                            });

                            var temp = new Date();
                            bot.hotTopic = temp.setHours(temp.getHours() + 4);

                            timeout = false;
                        } else if (topic.reactions.cache.get('👎').count == 4) {
                            msg.reply("your topic was voted down.");

                            var temp = new Date();
                            bot.hotTopic = temp.setHours(temp.getHours() + 1);

                            timeout = false;
                        }
                    });

                    collector.on("end", async collected => {
                        if (timeout) {
                            msg.reply('your suggestion timed out.')
                        }
                    });
                } else {
                    msg.reply("you must wait until `" + new Date(bot.hotTopic) + "` before this command can be used again.");
                }
            } else if (msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '854841000480079882') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '927318500614225920') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '775501181212295239') || msg.guild.members.cache.get(msg.author.id).roles.cache.some(role => role.id === '893189360105689139')) {
                //msg.channel.setTopic("Current topic: **" + input + "**");
                msg.channel.send("<@&956223433564385333> **A Hot Topic has been approved for discussion!**");
                msg.channel.send({
                    embed: {
                        color: 0x33cc33,
                        author: {
                            name: 'Topic from ' + msg.author.username,
                            icon_url: msg.author.avatarURL(),
                        },
                        description: "*" + input + "*",
                        timestamp: new Date()
                    }
                });

                var temp = new Date();
                bot.hotTopic = temp.setHours(temp.getHours() + 4);
            } else {
                msg.reply("something went wrong with the permissions architecture...someone @ jared!!");
            }
        } else {
            msg.reply("this command can only be used in the <#965272694264311899>, <#964239900620759070>, <#928407503690149939>, <#775839512914952212>, or <#951322929898061905> channels.")
        }
    }
}