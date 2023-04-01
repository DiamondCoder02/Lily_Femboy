/* eslint-disable no-console */
console.clear();
const chalk = require("chalk"), today = new Date(), yyyy = today.getFullYear();
let mm = today.getMonth() + 1, dd = today.getDate(), hh = today.getHours(), min = today.getMinutes(), sec = today.getSeconds(); // Months start at 0!
if (dd < 10) {dd = "0" + dd} if (mm < 10) {mm = "0" + mm} if (hh < 10) {hh = "0" + hh} if (min < 10) {min = "0" + min} if (sec < 10) {sec = "0" + sec}
const formattedToday = yyyy+"-"+mm+"-"+dd+"_"+hh+"-"+min+"-"+sec;

require("better-logging")(console, {
	format: ctx => `${ctx.date}${ctx.time} ${ctx.type} ${ctx.msg}`,
	saveToFile: `./logs/${formattedToday}.log`,
	color: {
		base: chalk.greenBright,
		type: { error: chalk.bgRed, warn: chalk.red, info: chalk.yellow, log: chalk.gray, debug: chalk.redBright }
	}
});
console.logLevel = 4;
/* All the log levels:
debug: 4 - log: 3 - info: 2 - warn: 1 - error: 0 - line: 1 - turn off all logging: -1

default: 3
console.log("foo"); // Logged to console & saved in 1594897100267.log
console.debug("foo"); // Won't log to console, but will be saved in 1594897100267.log
*/

const fs = require("fs"), { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
	ws: { properties: { browser: "Discord Android" } },
	intents: [
		GatewayIntentBits.Guilds, // 1
		GatewayIntentBits.GuildMembers, // 2
		GatewayIntentBits.GuildModeration, // 4
		GatewayIntentBits.GuildEmojisAndStickers, // 8
		// GatewayIntentBits.GuildIntegrations, // 16
		// GatewayIntentBits.GuildWebhooks, // 32
		GatewayIntentBits.GuildInvites, // 64
		// GatewayIntentBits.GuildVoiceStates, // 128
		// FUCK GatewayIntentBits.GuildPresences, // 256
		GatewayIntentBits.GuildMessages, // 512
		GatewayIntentBits.GuildMessageReactions, // 1024
		// GatewayIntentBits.GuildMessageTyping, // 2048
		GatewayIntentBits.DirectMessages, // 4096
		GatewayIntentBits.DirectMessageReactions, // 8192
		// GatewayIntentBits.DirectMessageTyping //16384
		// FUCK GatewayIntentBits.MessageContent, // 32768
		GatewayIntentBits.GuildScheduledEvents // 65536
		// GatewayIntentBits.AutoModerationConfiguration, //1048576
		// GatewayIntentBits.AutoModerationExecution //2097152
	],
	partials: [
		Partials.Channel,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.Message,
		Partials.Reaction,
		Partials.User
		// Partials.ThreadMember
	]
});

client.commands = new Collection();
// Enmap - server side settings
const Enmap = require("enmap");
client.settings = new Enmap({
	name: "settings",
	fetchAll: true,
	autoFetch: true,
	cloneLevel: "deep",
	autoEnsure: {
		enableNSFW: false,
		moderationChannel: "",
		enableBotUpdateMessage: true,
		enableRandomReactions: false
	}
});

let commandFuck = [];
// Command file reader
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command_files = require(`./commands/${file}`);
	client.commands.set(command_files.data.name, command_files);
	commandFuck.push(command_files);
}

// Event handler
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {client.once(event.name, (...args) => event.execute(...args, client))}
	else {client.on(event.name, (...args) => event.execute(...args, client))}
}

// Bot token
require("dotenv").config();
let token = process.env.token;
let deploying = process.env.deployAskOnStart;
if (deploying == "true") {
	const deployCommands = require("./deploy-commands.js");
	deployCommands.execute(client, token, commandFuck);
} else {
	client.login(token);
}

// Error handler
let debug_level = process.env.debug_level;
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
process.on("unhandledRejection", error => console.error("-----\nUncaught Rejection:\n-----\n", error));
process.on("uncaughtException", error => console.error("-----\nUncaught Exception:\n-----\n", error));
if (debug_level >= 3) {
	client.on("debug", (e) => console.debug(e));
}