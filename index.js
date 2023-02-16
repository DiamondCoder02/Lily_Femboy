console.clear();
//basic loaders
const fs = require('fs'), { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
const client = new Client({ 
    ws: {
        properties: { browser: 'Discord Android' }
    }, 
    intents: [
        GatewayIntentBits.Guilds, //1
        GatewayIntentBits.GuildMembers, //2
        GatewayIntentBits.GuildModeration, //4
        GatewayIntentBits.GuildEmojisAndStickers, //8
        GatewayIntentBits.GuildIntegrations, //16
        //GatewayIntentBits.GuildWebhooks, //32
        GatewayIntentBits.GuildInvites, //64
        GatewayIntentBits.GuildVoiceStates, //128
        //FUCK GatewayIntentBits.GuildPresences, //256
        GatewayIntentBits.GuildMessages, //512
        GatewayIntentBits.GuildMessageReactions, //1024
        //GatewayIntentBits.GuildMessageTyping, //2048
        GatewayIntentBits.DirectMessages, //4096
        GatewayIntentBits.DirectMessageReactions, //8192
        //GatewayIntentBits.DirectMessageTyping //16384
        //FUCK GatewayIntentBits.MessageContent, //32768
        GatewayIntentBits.GuildScheduledEvents, //65536
        GatewayIntentBits.AutoModerationConfiguration, //1048576
        GatewayIntentBits.AutoModerationExecution //2097152
    ],
    partials: [
        Partials.Channel, 
        Partials.GuildMember, 
        Partials.GuildScheduledEvent, 
        Partials.Message, 
        Partials.Reaction, 
        Partials.User, 
        //Partials.ThreadMember
    ]
});

client.commands = new Collection();
//Enmap - server side settings
const Enmap = require('enmap');
client.settings = new Enmap({
    name: "settings",
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep',
    autoEnsure: {
        enableNSFW: false,
        moderationChannel: "",
        enableBotUpdateMessage: true,
        enableRandomReactions: false,
    }
});

let commandFuck = []
//command file reader
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command_files = require(`./commands/${file}`);
	client.commands.set(command_files.data.name, command_files);
    commandFuck.push(command_files)
}

//event handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {client.once(event.name, (...args) => event.execute(...args, client))} 
    else {client.on(event.name, (...args) => event.execute(...args, client))}
}

//Bot token
require('dotenv').config(); 
var token = process.env.token;
var debug_level = process.env.debug_level;
client.login(token)

//error handler
console.log(client)
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
process.on('unhandledRejection', error => console.error('-----\nUncaught Rejection:\n-----\n', error));
process.on('uncaughtException', error => console.error('-----\nUncaught Exception:\n-----\n', error));
if (debug_level >= 3) { 
    client.on("debug", (e) => console.log(e))
}
