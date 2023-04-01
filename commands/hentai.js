const { SlashCommandBuilder } = require("@discordjs/builders");
const HMfull = require("hmfull");
module.exports = {
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setName("hentai")
		.setDescription("HENTAI!"),
	async execute(interaction, client) {
		if (!interaction.channel.nsfw && interaction.channel.type === interaction.ChannelType.GuildText) { return interaction.reply("Sorry, this is a Not Safe For Work command!")}
		let res = await HMfull.HMtai.nsfw.incest();
		console.log(res);
		console.log(res.url);
		interaction.reply({ content: "Command under programming. Till have this: (it is random)\n"+res.url });
	}
};