const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: "case",
  description: "Accesses and edits case logs",
  options: [
    {
      type: 1,
      name: "view",
      description: "View a specific case",
      options: [
        {
          type: 4,
          name: "case",
          description: "The targeted case ID",
          required: true
        }
      ]
    },
    {
      type: 1,
      name: "edit",
      description: "Edit a specific case's reason",
      options: [
        {
          type: 4,
          name: "case",
          description: "The targeted case ID",
          required: true
        },
        {
          type: 3,
          name: "reason",
          description: "The text to be added to the case reason",
          required: true
        }
      ]
    },
    {
      type: 1,
      name: "rewrite",
      description: "Rewrite a specific case's reason",
      options: [
        {
          type: 4,
          name: "case",
          description: "The targeted case ID",
          required: true
        },
        {
          type: 3,
          name: "reason",
          description: "The text to replace the case reason",
          required: true
        }
      ]
    },
    {
      type: 1,
      name: "delete",
      description: "Remove a specific case",
      options: [
        {
          type: 4,
          name: "case",
          description: "The targeted case ID",
          required: true
        }
      ]
    }
  ],
  run: async (client, interaction) => {
    const caseNumber = interaction.options.getInteger("case");
    console.log("Case command fired for case ID " + caseNumber + "!");

    if (client.logs[caseNumber]) {
      if (interaction.options.getSubcommand() === 'view') {

        // view case
        var userid = client.logs[caseNumber].userid;
        var moderator = interaction.guild.members.cache.get(client.logs[caseNumber].moderatorid);

        var log = new MessageEmbed()
          .setTitle('Case ' + client.logs[caseNumber].caseNum)
          .addField(client.logs[caseNumber].type + ' issued by ' + moderator.user.username, client.logs[caseNumber].date + '\n' + client.logs[caseNumber].reason)
          .setTimestamp()
          .setColor(3447003);

        if (interaction.guild.members.cache.get(userid)) {
          var target = interaction.guild.members.cache.get(client.logs[caseNumber].userid);
          log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
          log.setFooter('User ID: ' + target.id)
        } else {
          var target = client.logs[caseNumber].userid;
          log.setAuthor("(User left server) ID: " + target);
          log.setFooter('User ID: ' + userid);
        }


        interaction.channel.send({
          embeds: [log]
        });

      } else if (interaction.options.getSubcommand() === 'edit') {
        const reason = interaction.options.getString("reason");

        // edit case
        client.logs[caseNumber].reason += "\nEdited on `" + new Date() + "`\n" + reason
        interaction.reply("Case updated! New case:");
        var userid = client.logs[caseNumber].userid;
        var target = interaction.guild.members.cache.get(userid);
        var moderator = interaction.guild.members.cache.get(client.logs[caseNumber].moderatorid);

        var log = new MessageEmbed()
          .setTitle('Case ' + client.logs[caseNumber].caseNum)
          .addField(client.logs[caseNumber].type + ' issued by ' + moderator.user.username, client.logs[caseNumber].date + '\n' + client.logs[caseNumber].reason)
          .setTimestamp()
          .setColor(3447003);

        if (interaction.guild.members.cache.get(userid)) {
          var target = interaction.guild.members.cache.get(client.logs[caseNumber].userid);
          log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
          log.setFooter('User ID: ' + target.id)
        } else {
          var target = client.logs[caseNumber].userid;
          log.setAuthor("(User left server) ID: " + target);
          log.setFooter('User ID: ' + userid);
        }

        interaction.channel.send({
          embeds: [log]
        });

      } else if (interaction.options.getSubcommand() === 'rewrite') {
        const reason = interaction.options.getString("reason");

        // rewrite case
        client.logs[caseNumber].reason = "Edited on `" + new Date() + "`\n" + reason
        interaction.reply("Case updated! New case:");
        var userid = client.logs[caseNumber].userid;
        var target = interaction.guild.members.cache.get(userid);
        var moderator = interaction.guild.members.cache.get(client.logs[caseNumber].moderatorid);

        var log = new MessageEmbed()
          .setTitle('Case ' + client.logs[caseNumber].caseNum)
          .addField(client.logs[caseNumber].type + ' issued by ' + moderator.user.username, client.logs[caseNumber].date + '\n' + client.logs[caseNumber].reason)
          .setTimestamp()
          .setColor(3447003);

        if (interaction.guild.members.cache.get(userid)) {
          var target = interaction.guild.members.cache.get(client.logs[caseNumber].userid);
          log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
          log.setFooter('User ID: ' + target.id)
        } else {
          var target = client.logs[caseNumber].userid;
          log.setAuthor("(User left server) ID: " + target);
          log.setFooter('User ID: ' + userid);
        }

        interaction.channel.send({
          embeds: [log]
        });

      } else if (interaction.options.getSubcommand() === 'delete') {

        // delete case
        if (interaction.user.id == client.config.owner || interaction.guild.members.cache.get(interaction.user.id).roles.cache.some(role => role.id === '775501181212295239') || interaction.guild.members.cache.get(interaction.user.id).roles.cache.some(role => role.id === '927318500614225920')) {
          delete client.logs[caseNumber]
          interaction.reply("Case deleted!")
        } else {
          interaction.reply('due to database & logging security, data can only be deleted by Senior Moderation Staff.')
        }

      }
    } else if (!client.logs[caseNumber]) {
      interaction.reply('this case does not exist!');
    }
  },
};