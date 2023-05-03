/* eslint-disable no-console */
console.clear();
require("dotenv").config();
let debug_level = process.env.debug_level;
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
console.logLevel = Number(debug_level);

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

client.commands = new Collection();
let forDeploy = [];
// Command file reader
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command_files = require(`./commands/${file}`);
	client.commands.set(command_files.data.name, command_files);
	forDeploy.push(command_files.data.toJSON());
}

// Event handler
let eventFolders = fs.readdirSync("./events");
for (const folder of eventFolders) {
	fs.readdir(`./events/${folder}`, (err, files) => {
		if (err) {throw err}
		for (const file of files) {
			if (!file.endsWith(".js")) {continue}
			const event = require(`./events/${folder}/${file}`);
			if (event.once) {client.once(event.name, (...args) => event.execute(...args, client))}
			else {client.on(event.name, (...args) => event.execute(...args, client))}
		}
	});
}

// Bot token
let token = process.env.token;
let deploying = process.env.deployAskOnStart;
if (deploying == "true") {
	const deployCommands = require("./deploy-commands.js");
	deployCommands.execute(client, token, forDeploy);
} else {
	client.login(token);
}

// Error handler
client.on("error", (e) => console.error("indexError: ", e));
client.on("warn", (e) => console.warn("indexWarn: ", e));
process.on("unhandledRejection", error => console.line("----- Uncaught Rejection: -----\n", error));
process.on("uncaughtException", error => console.line("----- Uncaught Exception: -----\n", error));
if (debug_level >= 4) {
	client.on("debug", (e) => console.debug("indexDebug: ", e));
}