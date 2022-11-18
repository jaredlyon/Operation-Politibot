const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "collatz",
    description: "demonstrates the Collatz Conjecture",
    options: [
      {
        type: 4,
        name: "number",
        description: "The number to test",
        required: true
      }
    ],
	run: async(client, interaction) => {
        var number = await interaction.options.getInteger('number');
        var iterations = 0;

        if (isNaN(number)) {
            msg.reply("Incorrect input (NaN).")
        } else if (!Number.isInteger(number)) {
            msg.reply("Number must be an integer!");
        } else if (number < 1) {
            msg.reply("Negative numbers break this Collatz Conjecture tester, since negative integers reveal three separate loops as opposed to the positiver integer set's 4-2-1 loop.");
        } else {
            const sequence = [];
            sequence.push(number);
            while (number != 1) {
                if (number % 2 == 0) {
                    number = number / 2;
                    console.log(number);
                    sequence.push(" " + number);
                    iterations++;
                } else {
                    number = (number * 3) + 1;
                    console.log(number);
                    sequence.push(" " + number);
                    iterations++;
                }
            }

            interaction.reply("Your number went through `" + iterations + "` iteration(s) before being reduced to `1`.");
            interaction.channel.send("Final sequence: [" + sequence + "].").catch(() => {
                msg.channel.send("*Final sequence could not be displayed due to its length.*");
            })
        }
    }
}