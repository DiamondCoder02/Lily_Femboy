const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ChannelType } = require('discord.js');
const fetch = require('node-fetch')
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    cooldown: 10,
	data: new SlashCommandBuilder()
        .setName('waifu_pics')
        .setDescription('Pictures from waifu.pics')
        .addSubcommand(subcommand => subcommand.setName('nsfw').setDescription('NSFW pictures')
            .addStringOption(option => option.setName('category').setDescription('NSFW category')
                .addChoices(
                    { name: 'waifu', value: 'waifu' },
                    { name: 'neko', value: 'neko' },
                    { name: 'trap', value: 'trap' },
                    { name: 'blowjob', value: 'blowjob' }
                )
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription("Amount: If you want to get more then one at a time.").setMinValue(1).setMaxValue(10))
        ),
    async execute(interaction, client) {
        try {
            interaction.options.getSubcommand() === 'sfw2' ? type = 'sfw' : type = interaction.options.getSubcommand();
            const category = interaction.options.getString('category');
            if (!interaction.channel.nsfw && interaction.channel.type === ChannelType.GuildText) { return interaction.reply("Sorry, this is a Not Safe For Work command!") }
            if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
            for (let a = 0; a < amount; a++ ) {
                let response = await fetch(`https://api.waifu.pics/nsfw/${category}`);
                let data = await response.text();
                const img = JSON.parse(data)
                const embed = new EmbedBuilder()
                    .setImage(img.url)
                    .setFooter({text: `${category} - ${a+1}/${amount}`})
                    .setColor('#A020F0 ')
                try { await interaction.followUp({ embeds: [embed]}) }
                catch { interaction.reply({ embeds: [embed]}) }
                await wait(1000);
            }
        }catch(error) {
            console.log(error)
        }
    }
}