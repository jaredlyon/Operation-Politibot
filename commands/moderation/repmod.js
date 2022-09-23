const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    "name": "repmod",
    "description": "Moderator commands!",
    "options": [
      {
        "type": 1,
        "name": "10",
        "description": "Gives a designated user 10 reputation points.",
        "options": [
          {
            "type": 6,
            "name": "target",
            "description": "",
            "required": true
          }
        ]
      },
      {
        "type": 1,
        "name": "-10",
        "description": "Removes 10 reputation points from a user.",
        "options": [
          {
            "type": 6,
            "name": "target",
            "description": "",
            "required": true
          }
        ]
      },
      {
        "type": 1,
        "name": "remove",
        "description": "Did somebody get a false reputation point? Remove it!",
        "options": [
          {
            "type": 6,
            "name": "target",
            "description": "",
            "required": true
          }
        ]
      }
    ],
	run: async(client, interaction) => {

    }
};