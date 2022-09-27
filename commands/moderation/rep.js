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

    const filter = i => {
      return i.user.id === interaction.user.id;
    };

    if (interaction.options.getSubcommandGroup() === "points" && interaction.options.getSubcommand() === 'add') {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      if (new Date() - new Date(client.repData[interaction.user.id].lastRepGiven) >= 1800000) {
        client.repData[targetID].upvotes++;
        client.repData[interaction.user.id].upvotesGiven++;
        client.repData[targetID].lastRepReceived = new Date();
        client.repData[interaction.user.id].lastRepGiven = new Date();
        const repUpEmbed = {
          color: '#ffffff',
          description: `${targetUser.toString()}, somebody gave you a reputation point! Keep it up!`
        };
        const repUpConfirm = {
          color: `#ffffff`,
          description: `Are you sure you would like to give a rep to ${targetUser.toString()} and upvote them?`,
          footer: {
            text: 'Please confirm or cancel below.'
          }
        };
        const repUpSent = {
          color: `#ffffff`,
          description: `You have upvoted ${targetUser.toString()}!`
        };
        const confirmButtons = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('confirm')
              .setLabel('Confirm')
              .setStyle('SUCCESS'),
            new MessageButton()
              .setCustomId('cancel')
              .setLabel('Cancel')
              .setStyle('DANGER'),
          );

        const confirmDenyInt = await interaction.reply({ embeds: [repUpConfirm], components: [confirmButtons], ephemeral: true });

        confirmDenyInt.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 10 }).then(async interaction => {
          confirmDenyValue = interaction.values

          if (confirmDenyValue === 'cancel') {
            interaction.update({ content: 'Prompt cancelled.', ephemeral: true, embeds: [], components: [] })
            console.log("[REP DATA] Prompt cancelled.")
          } else if (confirmDenyValue === 'confirm') {
            interaction.update({ embeds: [repUpSent], components: [], ephemeral: true })
            interaction.channel.send({ embeds: [repUpEmbed] })
            console.log("[REP DATA] " + interaction.user.username + " has given rep to " + targetUser.username + ".");
          } else {
            interaction.update({ content: 'Something went wrong!', ephemeral: true })
            console.log("[REP DATA] Something went wrong!")
          }
        })
      } else {
        const timeRemaining = convert(new Date(), new Date(client.repData[interaction.user.id].lastRepGiven));
        const cooldownError = {
          color: '#ffffff',
          description: 'Your rep points cooldown has not elapsed yet! Time Remaining:' + '`' + timeRemaining + '`' // 30 mins of sleep brain said this is how you set this up.
        };
        interaction.reply({
          embeds: [cooldownError],
          ephemeral: true,
        })
      }

    } else if (interaction.options.getSubcommandGroup() === "points" && interaction.options.getSubcommand() === 'sub') {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      if (new Date() - new Date(client.repData[interaction.user.id].lastRepGiven) >= 10) {
        client.repData[targetID].downvotes++;
        client.repData[interaction.user.id].downvotesGiven++;
        client.repData[interaction.user.id].lastRepGiven = new Date();

        const repDownEmbed = {
          color: '#ffffff',
          description: `${targetUser.toString()}, somebody gave you a negative reputation point! Try to do better!`
        };
        const repDownConfirm = {
          color: `#ffffff`,
          description: `Are you sure you would like to give a negative rep to ${targetUser.toString()} and downvote them?`,
          footer: {
            text: 'Please confirm or cancel below.'
          }
        };
        const repDownSent = {
          color: `#ffffff`,
          description: `You have downvoted ${targetUser.toString()}!`
        };
        const confirmButtons2 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('confirm')
              .setLabel('Confirm')
              .setStyle('SUCCESS'),
            new MessageButton()
              .setCustomId('cancel')
              .setLabel('Cancel')
              .setStyle('DANGER'),
          );

        const confirmDenyInt2 = await interaction.reply({ embeds: [repDownConfirm], components: [confirmButtons2], ephemeral: true });

        confirmDenyInt2.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 1200000 }).then(async interaction => {
          confirmDenyValue = interaction.values

          if (confirmDenyValue === 'cancel') {
            interaction.update({ content: 'Prompt cancelled.', ephemeral: true, embeds: [], components: [] })
            console.log("[REP DATA] Prompt cancelled.")
          } else if (confirmDenyValue === 'confirm') {
            interaction.update({ embeds: [repDownSent], components: [], ephemeral: true })
            interaction.channel.send({ embeds: [repDownEmbed] })
            console.log("[REP DATA] " + interaction.user.username + " has given a negative rep to " + targetUser.username + ".");
          } else {
            interaction.update({ content: 'Something went wrong!', ephemeral: true })
            console.log("[REP DATA] Something went wrong!")
          }
        })
      } else {
        const timeRemaining = convert(new Date(), new Date(client.repData[interaction.user.id].lastRepGiven));
        const cooldownError = {
          color: '#ffffff',
          description: 'Your rep points cooldown has not elapsed yet! Time Remaining:' + '`' + timeRemaining + '`' // 30 mins of sleep brain said this is how you set this up.
        };
        interaction.reply({
          embeds: [cooldownError],
          ephemeral: true,
        })
      }

    } else if (interaction.options.getSubcommandGroup() === "info" && interaction.options.getSubcommand() === 'profile') {
      var targetUser = interaction.options.getUser("target");
      var targetID = targetUser.id;

      const profileEmbed = {
        color: '#ffffff',
        author: {
          name: targetUser.username + `'s reputation profile`,
          icon_url: targetUser.avatarURL(),
        },
        fields: [
          {
            name: `➕ Positive Points`,
            value: '`' + client.repData[targetID].upvotes + '`',
            inline: true,
          },
          {
            name: `Total Points`,
            value: '`' + (client.repData[targetID].upvotes - client.repData[targetID].downvotes) + '`',
            inline: true,
          },
          {
            name: '➖ Negative Points',
            value: '`' + client.repData[targetID].downvotes + '`',
            inline: true,
          },
          {
            name: 'Last +Rep Received:',
            value: '`' + client.repData[targetID].lastRepReceived + '`'
          },
          {
            name: 'Last Given:',
            value: '`' + client.repData[targetID].lastRepGiven + '`'
          }
        ],
        timestamp: new Date(),
        footer: {
          text: client.user.username,
          icon_url: client.user.avatarURL(),
        }
      };

      interaction.reply({
        embeds: [profileEmbed]
      })

    } else if (interaction.options.getSubcommandGroup() === "info" && interaction.options.getSubcommand() === 'leaderboard') {
      var repData = [];

      for (var val in client.repData) {
        client.repData[val].userID = val;
        repData.push(client.repData[val])
      }

      repData.sort((a, b) => parseFloat((b.upvotes - b.downvotes)) - parseFloat((a.upvotes - a.downvotes)));

      var lb = {
        color: interaction.guild.me.displayHexColor,
        title: 'Operation Politics Reputation Leaderboard',
        footer: {
          text: interaction.guild.name,
          icon_url: interaction.guild.iconURL(),
        },
      };

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

    // date conversion function
    function convert(d1, d2) {
      // console.log(d1);
      // console.log(d2);
      var t1 = d1.getTime();
      var t2 = d2.getTime();
      var duration = 86400000 - (t1 - t2);

      var milliseconds = parseInt((duration % 500) / 50),
        seconds = parseInt((duration / 500) % 60),
        minutes = parseInt((duration / (500 * 60)) % 60),
        hours = parseInt((duration / (500 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
  }
};