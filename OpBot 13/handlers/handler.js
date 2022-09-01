const fs = require('fs');

const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./events");
    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(`./events/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);

            if (event.name) {
                console.log(` ✔️ => Event ${file} is being loaded `);
            } else {
                console.log(` ❌ => Event ${file} missing a help.name or help.name is not in string `);
                continue;
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }

        }
    }
}

const loadCommands = async function (client) {
    let commandslist = []

    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);

            if (command.name) {
                client.commandslist.set(command.name, command);
                commandslist.push(command)
                console.log(` ✔️ => Command ${file} is being loaded `);
            } else {
                console.log(` ❌ => Command ${file} missing a help.name or help.name is not in string `);
                continue;
            }
        }
    }
    

    client.on("ready", async () => {
        client.config = require('../config.json');
        console.log("Config loaded!");
        client.syncLogs();
        console.log("Moderation logs synced!");
        client.syncCaseNum();
        console.log("Current case number loaded!");
        client.syncAutoMute();
        console.log("Automute timers activated!");
        client.syncMsgCount();
        console.log("Member message counts loaded!");
        await client.startDatabase();
        console.log("RethinkDB tables started!");

        client.user.setPresence({ status: 'online', activities: { name: 'politics | !help', type: 0 } });

        console.log(`${client.user.username} is online and ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers!`);

        await client.application.commands.set(commandslist);
    })
}

module.exports = {
    loadEvents,
    loadCommands,
}