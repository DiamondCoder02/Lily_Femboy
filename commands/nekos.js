const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
const { NekoBot, NekoLove, Nekos } = require("hmfull");
module.exports = {
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setNSFW(true)
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
		.addNumberOption(option => option.setName("repeat").setDescription("Amount: If you want to get more than one at a time.").setMinValue(1).setMaxValue(10))
		.addSubcommand(subcommand => subcommand
			.setName("auto")
			.setDescription("Repeats forever")
		),
	async execute(interaction) {
		if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply({ content: "Sorry, this is a Not Safe For Work command! Channel is not set to age-restricted." }) }
		let amount = 1;
		const options = interaction.options.getString("options");

		// Check if the "auto" subcommand is used
		const isAuto = interaction.options.getSubcommand() === "auto";

		do {
			if (interaction.options.getNumber("repeat")) { amount = Number(interaction.options.getNumber("repeat")) }
			const embed = new EmbedBuilder()
				.setTimestamp()
				.setTitle(options)
				.setColor([160, 32, 240]);

			for (let a = 0; a < amount; a++) {
				let link;
				switch (options) {
					// Cases for each option...
				}

				embed.setFooter({ text: `${options} - ${a + 1}/${amount}` }).setImage(link);
				try { await interaction.reply({ embeds: [embed] }) }
				catch {
					await wait(1000);
					await interaction.followUp({ embeds: [embed] });
				}
			}

			// If "auto" is used, wait for a moment before the next iteration
			if (isAuto) {
				await wait(5000); // Adjust the time interval as needed
			}
		} while (isAuto);
	}
};
