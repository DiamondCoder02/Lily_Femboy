const { EmbedBuilder } = require("discord.js");
require("dotenv").config(); let botStatusChannelId = process.env.botstatus_channelid; let debug_level = process.env.debug_level;
module.exports = {
	name: "guildCreate",
	async execute(guild, client) {
		console.log(`[${new Date().toLocaleString("hu-HU")}] Bot joined guild: ${guild.name}`);
		const embed = new EmbedBuilder()
			.setColor("#FFFF00")
			.setTitle("Bot joined a guild!")
			.setDescription(`Name: \`${guild.name}\` with \`${guild.memberCount}\` members *(bot included)*)`);
		const channel = client.channels.cache.get(botStatusChannelId);
		channel.send({ embeds: [embed] });

		let bot=client.user;
		try {
			const channel = client.channels.cache.get(guild.systemChannelId);
			channel.send(`__**Let me, the ${bot.toString()} bot, corrupt this server X3.**__
I assume my twin made you invite me. Hope you won't mind the lewdness. ^^
Now the better question is, who will be dominating here ( •̀ ω •́ )y

__I'm still being developed__
All of my commands works with slash commands. More info about them at https://imgur.com/a/dStRp6Y. 
\nTo edit my server config please go to: http://femboy.redirectme.net/`
			);
		} catch {
			client.users.fetch(guild.ownerId).then(user => {
				user.send(`__**Let me, the ${bot.toString()} bot, corrupt this server X3.**__
I assume my twin made you invite me. Hope you won't mind the lewdness. ^^
Now the better question is, who will be dominating ( •̀ ω •́ )y

__I'm still being developed__
All of my commands works with slash commands. More info about them at https://imgur.com/a/dStRp6Y. 
\nTo edit my server config please go to: http://femboy.redirectme.net/`
				);
			}).catch(err => { console.log("guildCreate Error:", err) });
		}
	}
};