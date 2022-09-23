const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: "rep",
  description: "Access the reputation system!",
  options: [
    {
      type: 2,
      name: "points",
      description: "Give or take away reputation points from a user.",
      options: [
        {
          type: 1,
          name: "add",
          description: "Upvote a user for good behavior / good faith discussions.",
          options: [
            {
              type: 6,
              name: "target",
              description: "Target a user who will receive a rep point.",
              required: true
            }
          ]
        },
        {
          type: 1,
          name: "sub",
          description: "Downvote a user for poor behavior / bad faith discussions.",
          options: [
            {
              type: 6,
              name: "target",
              description: "Target a user who will receive a rep point.",
              required: true
            }
          ]
        }
      ]
    },
    {
      type: 2,
      name: "info",
      description: "Find out information about the reputation system!",
      options: [
        {
          type: 1,
          name: "profile",
          description: "Displays a user's profile.",
          options: [
            {
              type: 6,
              name: "target",
              description: "Tag the user whose profile you want to see.",
              required: true
            }
          ]
        },
        {
          type: 1,
          name: "leaderboard",
          description: "Displays a leaderboard of the top 10 most reputable people!"
        }
      ]
    },
    {
      type: 1,
      name: "help",
      description: "Displays information about our reputation system!"
    }
  ],
  run: async (client, interaction) => {
    if (interaction.options.getSubcommandGroup() === "points" && interaction.options.getSubcommand() === 'add') {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      if (new Date() - new Date(client.repData[interaction.user.id].lastRepGiven) >= 86400000) {
        client.repData[targetID].repScore++;
        client.repData[interaction.user.id].repsGiven++;
        client.repData[targetID].lastRepReceived = new Date();
        client.repData[interaction.user.id].lastRepGiven = new Date();
        interaction.reply(targetUser.toString() + " has been repped by " + interaction.user.toString() + "!");
        console.log("[REP DATA] " + interaction.user.username + " has given rep to " + targetUser.username + ".");
      } else {
        interaction.reply("Your rep cooldown has not elapsed yet!")
      }

    } else if (interaction.options.getSubcommandGroup() === "points" && interaction.options.getSubcommand() === 'sub') {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      if (new Date() - new Date(client.repData[interaction.user.id].lastRepGiven) >= 86400000) {
        client.repData[targetID].repScore--;
        // omit below changes?
        //client.repData[interaction.user.id].repsGiven--;
        //client.repData[targetID].lastRepReceived = new Date();
        client.repData[interaction.user.id].lastRepGiven = new Date();
        interaction.reply(targetUser.toString() + " has been downvoted by " + interaction.user.toString() + "!");
        console.log("[REP DATA] " + interaction.user.username + " has taken rep from " + targetUser.username + ".");
      } else {
        interaction.reply("Your rep cooldown has not elapsed yet!")
      }

    } else if (interaction.options.getSubcommandGroup() === "info" && interaction.options.getSubcommand() === 'profile') {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      interaction.reply(targetUser.toString() + " has **" + client.repData[targetID].repScore + "** rep!");

    } else if (interaction.options.getSubcommandGroup() === "info" && interaction.options.getSubcommand() === 'leaderboard') {
      var repData = [];

      for (var val in client.repData) {
        client.repData[val].userID = val;
        repData.push(client.repData[val])
      }

      repData.sort((a, b) => parseFloat(b.repScore) - parseFloat(a.repScore));

      var lb = new MessageEmbed()
        .setColor(interaction.guild.me.displayHexColor)
        .setTitle('Operation Politics Rep Leaderboard')
        .setFooter(interaction.guild.name, interaction.guild.iconURL());

      for (var i = 0; i < 12; i++) {
        var mem = client.users.cache.get(repData[i].userID)

        if (mem == null) {
          mem = 'User Left Server'
        } else {
          mem = client.users.cache.get(repData[i].userID).username
        }

        lb.addField(`${i + 1}: ${mem}`, repData[i].repScore + " rep", true);
      }

      interaction.reply({ embeds: [lb] });
    }
  }
};