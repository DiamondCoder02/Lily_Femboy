const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
const { HMtai } = require("hmfull");
module.exports = {
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setNSFW(true)
		.setName("hentai")
		.setDescription("HENTAI!")
		.addSubcommand(subcommand => subcommand
			.setName("vanilla")
			.setDescription("light hentai")
			.addStringOption(option => option.setName("options").setDescription("Not Required")
				.addChoices(
					{ name: "anal", value: "anal" },
					{ name: "ass", value: "ass" },
					{ name: "cum", value: "cum" },
					{ name: "classic", value: "classic" },
					{ name: "creampie", value: "creampie" },
					{ name: "hentai", value: "hentai" },
					{ name: "masturbation", value: "masturbation" },
					{ name: "yuri", value: "yuri" },
					{ name: "pantsu", value: "pantsu" },
					{ name: "glasses", value: "glasses" },
					{ name: "ahegao", value: "ahegao" },
					{ name: "boobs", value: "boobs" },
					{ name: "thighs", value: "thighs" },
					{ name: "handjob", value: "handjob" },
					{ name: "pussy", value: "pussy" },
					{ name: "blowjob", value: "blowjob" },
					{ name: "boobjob", value: "boobjob" },
					{ name: "gif", value: "gif" },
					{ name: "nekos", value: "neko" },
					{ name: "mobileWallpaper", value: "mobilewallpaper" }
				)
			)
			.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
		)
		.addSubcommand(subcommand => subcommand
			.setName("lewd")
			.setDescription("pervert >w<")
			.addStringOption(option => option.setName("options").setDescription("Not Required")
				.addChoices(
					{ name: "bdsm", value: "bdsm" },
					{ name: "manga", value: "manga" },
					{ name: "femdom", value: "femdom" },
					{ name: "incest", value: "incest" },
					{ name: "public", value: "public" },
					{ name: "ero", value: "ero" },
					{ name: "orgy", value: "orgy" },
					{ name: "elves", value: "elves" },
					{ name: "cuckold", value: "cuckold" },
					{ name: "footjob", value: "footjob" },
					{ name: "uniform", value: "uniform" },
					{ name: "gangbang", value: "gangbang" },
					{ name: "tentacles", value: "tentacles" },
					{ name: "thighsSqueeze", value: "thigh" }
				)
			)
			.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
		),
	async execute(interaction) {
		let amount = 1;
		if (interaction.options.getNumber("repeat")) { amount = Number(interaction.options.getNumber("repeat")) }
		let options = interaction.options.getString("options");
		const embed = new EmbedBuilder()
			.setTimestamp()
			.setTitle(options)
			.setColor([160, 32, 240]);
		for (let a = 0; a < amount; a++) {
			let link;
			switch (options) {
			case "anal": link = (await HMtai.nsfw.anal()).url; break;
			case "ass": link = (await HMtai.nsfw.ass()).url; break;
			case "bdsm": link = (await HMtai.nsfw.bdsm()).url; break;
			case "cum": link = (await HMtai.nsfw.cum()).url; break;
			case "classic": link = (await HMtai.nsfw.classic()).url; break;
			case "creampie": link = (await HMtai.nsfw.creampie()).url; break;
			case "manga": link = (await HMtai.nsfw.manga()).url; break;
			case "femdom": link = (await HMtai.nsfw.femdom()).url; break;
			case "hentai": link = (await HMtai.nsfw.hentai()).url; break;
			case "incest": link = (await HMtai.nsfw.incest()).url; break;
			case "masturbation": link = (await HMtai.nsfw.masturbation()).url; break;
			case "public": link = (await HMtai.nsfw.public()).url; break;
			case "ero": link = (await HMtai.nsfw.orgy()).url; break;
			case "elves": link = (await HMtai.nsfw.elves()).url; break;
			case "yuri": link = (await HMtai.nsfw.yuri()).url; break;
			case "pantsu": link = (await HMtai.nsfw.pantsu()).url; break;
			case "glasses": link = (await HMtai.nsfw.glasses()).url; break;
			case "cuckold": link = (await HMtai.nsfw.cuckold()).url; break;
			case "blowjob": link = (await HMtai.nsfw.blowjob()).url; break;
			case "boobjob": link = (await HMtai.nsfw.boobjob()).url; break;
			case "footjob": link = (await HMtai.nsfw.footjob()).url; break;
			case "handjob": link = (await HMtai.nsfw.handjob()).url; break;
			case "boobs": link = (await HMtai.nsfw.boobs()).url; break;
			case "thighs": link = (await HMtai.nsfw.thighs()).url; break;
			case "pussy": link = (await HMtai.nsfw.pussy()).url; break;
			case "ahegao": link = (await HMtai.nsfw.ahegao()).url; break;
			case "uniform": link = (await HMtai.nsfw.uniform()).url; break;
			case "gangbang": link = (await HMtai.nsfw.gangbang()).url; break;
			case "tentacles": link = (await HMtai.nsfw.tentacles()).url; break;
			case "gif": link = (await HMtai.nsfw.gif()).url; break;
			case "neko": link = (await HMtai.nsfw.nsfwNeko()).url; break;
			case "mobilewallpaper": link = (await HMtai.nsfw.nsfwMobileWallpaper()).url; break;
			case "thigh": link = (await HMtai.nsfw.zettaiRyouiki()).url; break;
			default: link = (await HMtai.nsfw.hentai()).url; break;
			}
			if (options === null){ options = interaction.options.getSubcommand() }
			embed.setFooter({ text: `${options} - ${a + 1}/${amount}` }).setImage(link);
			try { await interaction.reply({ embeds: [embed] }) }
			catch {
				await wait(1000);
				await interaction.followUp({ embeds: [embed] });
			}
		}
	}
};