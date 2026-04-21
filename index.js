require("dotenv").config();
const { connecttodb } = require("./connection");
const Chat = require("./model/chatschema");
const { askgemini } = require("./gemini");
const { Client, GatewayIntentBits } = require("discord.js");

const MAX_DISCORD_REPLY_LENGTH = 1900;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const command = "ask";
    const normalizedContent = message.content.toLowerCase();
    if (
        normalizedContent !== command &&
        !normalizedContent.startsWith(`${command} `)
    ) {
        return;
    }

    const prompt = message.content.slice(command.length).trim();
    if (!prompt) {
        return message.reply("Enter a prompt after ask");
    }

    try {
        console.log("Message received!!!!");
        await message.channel.sendTyping();

        let chat = await Chat.findOne({ userId: message.author.id });
        if (!chat) {
            chat = new Chat({
                userId: message.author.id,
                msg: [],
            });
        }

        chat.msg.push({ role: "user", content: prompt });

        const lastFiveMessages = chat.msg.slice(-5);
        const context = lastFiveMessages
            .map((item) => `${item.role}: ${item.content}`)
            .join("\n");

        const ans = await askgemini(context);
        chat.msg.push({ role: "bot", content: ans });

        await chat.save();
        console.log("Chat saved!!!!");

        await message.reply(ans.slice(0, MAX_DISCORD_REPLY_LENGTH));
    } catch (error) {
        console.error("Error while asking Gemini:", error);
        await message.reply("Sorry, I couldn't get a response from Gemini.");
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    try {
        if (interaction.commandName === "ping") {
            await interaction.reply({ content: "Pong!!!!" });
            return;
        }

        if (interaction.commandName === "ask") {
            const prompt = interaction.options.getString("prompt");

            if (!interaction.deferred && !interaction.replied) {
                await interaction.deferReply();
            }

            const result = await askgemini(prompt);

            if (interaction.deferred || interaction.replied) {
                await interaction.editReply(
                    result.slice(0, MAX_DISCORD_REPLY_LENGTH)
                );
            } else {
                await interaction.reply(
                    result.slice(0, MAX_DISCORD_REPLY_LENGTH)
                );
            }
        }
    } catch (error) {
        console.error("Interaction error:", error);

        try {
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply("Error getting response.");
            } else {
                await interaction.reply("Error getting response.");
            }
        } catch (err) {
            console.error("Failed to send error reply:", err);
        }
    }
});

async function startBot() {
    await connecttodb();
    await client.login(process.env.DISCORD_BOT_TOKEN);
    console.log("Bot is online");
}

startBot().catch((error) => {
    console.error("Failed to start bot:", error);
});
