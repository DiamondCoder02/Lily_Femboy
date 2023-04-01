const { EmbedBuilder } = require("discord.js");
require("dotenv").config(); let botStatusChannelId = process.env.botstatus_channelid;
module.exports = {
	name: "guildDelete",
	async execute(guild, client) {
		console.log(`[${new Date().toLocaleString("hu-HU")}] Bot left guild: ${guild.name}`);
		const embed = new EmbedBuilder()
			.setColor("#FFFF00")
			.setTitle("Bot left a guild!")
			.setDescription(`Name: \`${guild.name}\` \n(ID: \`${guild.id}\`)`);
		try {
			const channel = client.channels.cache.get(botStatusChannelId);
			channel.send({ embeds: [embed] });
		} catch {
			console.log(`[${new Date().toLocaleString("hu-HU")}] No status channel given or found. Guild delete Continuing...`);
		}
	}
};