const { EmbedBuilder, ActivityType } = require("discord.js");
require("dotenv").config();
let stopPassword = process.env.stop_password;
let debug_level = process.env.debug_level;
let botStatusChannelId = process.env.botstatus_channelid;
module.exports = {
	name: "ready",
	once: true,
	execute(arg, client) {
		client.user.setActivity(client.guilds.cache.size+" servers currently", { type: ActivityType.Watching });
		setInterval(() => {
			client.user.setActivity(client.guilds.cache.size+" servers currently", { type: ActivityType.Watching });
		}, 10800000);

		// eslint-disable-next-line no-console
		console.log("\n -- Logged in as: " + client.user.tag
			+ "\n\t -- Client_ID: " + client.user.id
			+ "\n\t -- Password: " + stopPassword
			+ "\n\t -- Debug_level: " + debug_level
			+ "\n\t -- Ready at: " + client.readyAt);

		const embed = new EmbedBuilder()
			.setColor("#FFFF00")
			.setTitle("Bot has started! \n" + client.user.tag)
			.setDescription(`Bot info:
DebugLevel: ${debug_level},
Ready: <t:${Math.floor(client.readyTimestamp / 1000)}:f> 
That was: <t:${Math.floor(client.readyTimestamp / 1000)}:R>`);
		const channel = client.channels.cache.get(botStatusChannelId);
		channel.send({ embeds: [embed] });
	}
};