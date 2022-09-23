const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: "repmod",
  description: "Moderator commands!",
  options: [
    {
      type: 1,
      name: "10",
      description: "Gives a designated user 10 reputation points.",
      options: [
        {
          type: 6,
          name: "target",
          description: "The target user",
          required: true
        }
      ]
    },
    {
      type: 1,
      name: "-10",
      description: "Removes 10 reputation points from a user.",
      options: [
        {
          type: 6,
          name: "target",
          description: "The target user",
          required: true
        }
      ]
    },
    {
      type: 1,
      name: "remove",
      description: "Did somebody get a false reputation point? Remove it!",
      options: [
        {
          type: 6,
          name: "target",
          description: "The target user",
          required: true
        }
      ]
    },
    {
      type: 1,
      name: "add",
      description: "Grant a rep to a user!",
      options: [
        {
          type: 6,
          name: "target",
          description: "The target user",
          required: true
        }
      ]
    }
  ],
  run: async (client, interaction) => {
    if (interaction.options.getSubcommand() === "10") {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      client.repData[targetID].repScore += 10;
      //client.repData[interaction.user.id].repsGiven += 10;
      client.repData[targetID].lastRepReceived = new Date();
      //client.repData[interaction.user.id].lastRepGiven = new Date();
      interaction.reply(targetUser.toString() + " has been given 10 rep by " + interaction.user.toString() + "!");
      console.log("[REP DATA] " + interaction.user.username + " has given 10 rep to " + targetUser.username + ".");

    } else if (interaction.options.getSubcommand() === "-10") {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      client.repData[targetID].repScore -= 10;
      //client.repData[interaction.user.id].repsGiven += 10;
      //client.repData[targetID].lastRepReceived = new Date();
      //client.repData[interaction.user.id].lastRepGiven = new Date();
      interaction.reply(targetUser.toString() + " has had 10 rep taken by " + interaction.user.toString() + "!");
      console.log("[REP DATA] " + interaction.user.username + " has taken 10 rep from " + targetUser.username + ".");

    } else if (interaction.options.getSubcommand() === "remove") {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      client.repData[targetID].repScore--;
      //client.repData[interaction.user.id].repsGiven += 10;
      //client.repData[targetID].lastRepReceived = new Date();
      //client.repData[interaction.user.id].lastRepGiven = new Date();
      interaction.reply(targetUser.toString() + " has had rep stripped from them by " + interaction.user.toString() + "!");
      console.log("[REP DATA] " + interaction.user.username + " has stripped a rep from " + targetUser.username + ".");

    } else if (interaction.options.getSubcommand() === "add") {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      client.repData[targetID].repScore++;
      //client.repData[interaction.user.id].repsGiven += 10;
      //client.repData[targetID].lastRepReceived = new Date();
      //client.repData[interaction.user.id].lastRepGiven = new Date();
      interaction.reply(targetUser.toString() + " has been repped by " + interaction.user.toString() + "!");
      console.log("[REP DATA] " + interaction.user.username + " has given rep to " + targetUser.username + ".");

    }
  }
};