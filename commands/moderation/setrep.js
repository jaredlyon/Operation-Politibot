const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: "setrep",
  description: "Moderation commands for rep!",
  options: [,
    {
      type: 1,
      name: "downvote",
      description: "Set a user's downvotes",
      options: [
        {
          type: 6,
          name: "target",
          description: "The target user",
          required: true
        },
        {
          type: 4,
          name: "input",
          description: "The number to set to",
          required: true
        }
      ]
    },
    {
      type: 1,
      name: "upvote",
      description: "Set a user's upvotes",
      options: [
        {
          type: 6,
          name: "target",
          description: "The target user",
          required: true
        },
        {
          type: 4,
          name: "input",
          description: "The number to set to",
          required: true
        }
      ]
    },
    {
      type: 1,
      name: "reset",
      description: "Resets a user's upvotes"
    }
  ],
  run: async (client, interaction) => {
    const logChannel = client.channels.cache.get('1025194221134692362');
    const downvote = client.emojis.cache.find(emoji => emoji.name == "red_minus").toString();
    const upvote = client.emojis.cache.find(emoji => emoji.name == "green_plus").toString();

    if (interaction.options.getSubcommand() === "upvote") {
      var input = interaction.options.getInteger("input");
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      client.repData[targetID].upvotes = input;
      interaction.reply(targetUser.toString() + " has had their upvote rep set to " + input + " by " + interaction.user.toString() + "!");
      logChannel.send(upvote + " | " + interaction.user.toString() + " has set " + targetUser.toString() + "'s upvotes to " + input + "!\nChannel:" + interaction.channel.toString());          
      console.log("[REP DATA] " + interaction.user.username + " has set " + targetUser.username + "'s upvote rep to " + input + ".");
    } else if (interaction.options.getSubcommand() === "downvote") {
      var input = interaction.options.getInteger("input");
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;
      
      client.repData[targetID].downvotes = input;
      interaction.reply(targetUser.toString() + " has had their downvote rep set to " + input + " by " + interaction.user.toString() + "!");
      logChannel.send(downvote + " | " + interaction.user.toString() + " has set " + targetUser.toString() + "'s downvotes to " + input + "!\nChannel:" + interaction.channel.toString());          
      console.log("[REP DATA] " + interaction.user.username + " has set " + targetUser.username + "'s downvote rep to " + input + ".");
    } else if (interaction.options.getSubcommand() === "reset") {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;
      
      client.repData[targetID].upvotes = 0;
      client.repData[targetID].downvotes = 0;
      interaction.reply(targetUser.toString() + " has had their rep reset by " + interaction.user.toString() + "!");
      logChannel.send(downvote + " | " + interaction.user.toString() + " has reset " + targetUser.toString() + "'s rep!\nChannel:" + interaction.channel.toString());          
      console.log("[REP DATA] " + interaction.user.username + " has reset " + targetUser.username + "'s rep.");
    }
  }
};