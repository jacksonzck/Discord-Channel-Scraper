const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
	.setName('scrape-channel')
    .setDescription("TODO")
    .setDMPermission(false),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        await interaction.reply("Todo");
        return
    },
}