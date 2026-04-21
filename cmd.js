require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "ping",
        description: "Replies with pong!",
    },
    {
        name: "ask",
        description: "Ask Gemini a question",
        options: [
            {
                name: "prompt",
                description: "Your question",
                type: 3,
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationCommands(process.env.APPLICATION_ID),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
