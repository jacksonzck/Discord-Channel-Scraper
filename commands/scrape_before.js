const { ContextMenuCommandBuilder, ApplicationCommandType, ContextMenuCommandInteraction, MessageContextMenuCommandInteraction, PermissionFlagsBits } = require('discord.js');
const { ChannelsAPI } = require('@discordjs/core')
const { REST } = require('@discordjs/rest')
const fs = require('fs')

module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('Scrape Before This Message')
	.setType(ApplicationCommandType.Message)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),
    /**
     * 
     * @param {MessageContextMenuCommandInteraction} interaction 
     */
    async execute(interaction) {
        // Make the directory if it doesn't currently exist
        await interaction.deferReply({ephemeral: true})
        guildName = interaction.guild.name
        if(!fs.existsSync("data/" + guildName + "/")) {
            fs.mkdirSync("data/" + guildName + "/")
        }
        // Make the JSON if it doesn't exist
        filepath = "data/" + guildName + "/" + interaction.channel.name + ".json"
        if(!fs.existsSync(filepath)) {
            messages = []
            messageJSON = {messages}
            fs.writeFileSync(filepath, JSON.stringify(messageJSON))
        }
        messageJSON = JSON.parse(fs.readFileSync(filepath))
        messages = messageJSON.messages
        // Gonna have to get the messages we want!
        const rest = new REST({ version: '10'}).setToken(process.env.TOKEN)
        const API = new ChannelsAPI(rest)
        new_messages = await API.getMessages(interaction.channelId, {before: interaction.targetId, limit: 100})
        messages.push(...new_messages)
        while(new_messages.length == 100) {
            await new Promise(r => setTimeout(r, 100)); // Don't want to get timed-out!
            last_message = new_messages[99].id
            new_messages = await API.getMessages(interaction.channelId, {before: last_message, limit: 100})
            messages.push(...new_messages)
        }
        messageJSON.messages = messages
        console.log("" + messages.length + " messages scraped.")
        fs.writeFileSync(filepath, JSON.stringify(messageJSON))
        await interaction.followUp({content: "Done!", ephemeral: true})
    },
}