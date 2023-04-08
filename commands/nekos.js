const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
const { NekoBot, NekoLove, Nekos } = require("hmfull");
module.exports = {
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setName("nekos")
		.setDescription("Lewd/hentai images about nekos")
		.addStringOption(option => option.setName("options").setDescription("Not Required")
			.addChoices(
				{ name: "nekogif", value: "nekogif" },
				{ name: "wallpaper", value: "wallpaper" },
				{ name: "hentai", value: "hentai" },
				{ name: "ass", value: "ass" },
				{ name: "boobs", value: "boobs" },
				{ name: "paizuri", value: "paizuri" },
				{ name: "yuri", value: "yuri" },
				{ name: "thigh", value: "thigh" },
				{ name: "lewdneko", value: "lewdneko" },
				{ name: "midriff", value: "midriff" },
				{ name: "tentacle", value: "tentacle" },
				{ name: "anal", value: "anal" },
				{ name: "neko", value: "neko" },
				{ name: "nekolewd", value: "nekolewd" }
			)
		)
		.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10)),
	async execute(interaction) {
		let amount = 1;
		if (!interaction.channel.nsfw) { return interaction.reply("Sorry, this is a Not Safe For Work command!")}
		if (interaction.options.getNumber("repeat")) { amount = Number(interaction.options.getNumber("repeat")) }
		const options = interaction.options.getString("options");
		const embed = new EmbedBuilder()
			.setTimestamp()
			.setTitle(options)
			.setColor([ 160, 32, 240 ]);
		for (let a = 0; a < amount; a++) {
			let link;
			switch (options) {
			case "nekogif": link = (await Nekos.nsfw.nekogif()).url; break;
			case "wallpaper": link = (await Nekos.nsfw.wallpaper()).url; break;
			case "hentai": link = (await NekoBot.nsfw.hentai()).url; break;
			case "ass": link = (await NekoBot.nsfw.ass()).url; break;
			case "boobs": link = (await NekoBot.nsfw.boobs()).url; break;
			case "paizuri": link = (await NekoBot.nsfw.paizuri()).url; break;
			case "yuri": link = (await NekoBot.nsfw.yuri()).url; break;
			case "thigh": link = (await NekoBot.nsfw.thigh()).url; break;
			case "lewdneko": link = (await NekoBot.nsfw.lewdneko()).url; break;
			case "midriff": link = (await NekoBot.nsfw.midriff()).url; break;
			case "tentacle": link = (await Nekos.nsfw.tentacle()).url; break;
			case "anal": link = (await Nekos.nsfw.anal()).url; break;
			case "neko": link = (await Nekos.nsfw.neko()).url; break;
			case "nekolewd": {let asd = NekoLove.nsfw(); link = (await asd.nekolewd()).url} break;
			default: link = (await NekoBot.nsfw.lewdneko()).url; break;
			}
			embed.setFooter({ text: `${options} - ${a+1}/${amount}` }).setImage(link);
			try { await interaction.reply({ embeds: [embed] }) }
			catch {
				await wait(1000);
				await interaction.followUp({ embeds: [embed] });
			}
		}
	}
};