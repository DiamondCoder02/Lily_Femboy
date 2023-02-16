const { EmbedBuilder, Client, PermissionsBitField } = require('discord.js'), fs = require('fs')
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
const botStat = require('../botConfigs/bot_private.json', 'utf8'); const SetAct = botStat.botStatus
require('dotenv').config(); 
var stopPassword = process.env.stop_password;
var debug_level = process.env.debug_level;
var botStatusChannelId = process.env.botstatus_channelid;
module.exports = {
	name: 'ready',
	once: true,
	execute(arg, client) {
        console.log(eventFiles)
        client.user.setActivity("Nya~ Develop me Senpai~")
        setInterval(() => {
            let status = SetAct[Math.floor(Math.random() * SetAct.length)]
            client.user.setActivity(status)
        }, 10800000)

        //Needs better way, but this checks for all values in guild
        client.guilds.cache.forEach(guild => {
            //add if needed
            console.log("Enmap check done for " + guild.name)
        })

        console.log(`\n -- Logged in as: ` + client.user.tag
            + `\n\t -- Client_ID: ` + client.user.id
            + `\n\t -- Password: ` + stopPassword
            + `\n\t -- Debug_level: ` + debug_level
            + `\n\t -- Ready at: ` + client.readyAt)

        const embed = new EmbedBuilder()
            .setColor('#FFFF00')
            .setTitle("Bot has started! \n" + client.user.tag)
            .setDescription(`Bot info:
DebugLevel: ${debug_level},
Ready: <t:${Math.floor(client.readyTimestamp / 1000)}:f> 
That was: <t:${Math.floor(client.readyTimestamp / 1000)}:R>`)
        try{
            const channel = client.channels.cache.get(botStatusChannelId)
            channel.send({embeds: [embed]})
        } catch {
            console.log("No status channel ID given or found. Continuing...")
        }
	}
}