const { ContextMenuCommandBuilder, ApplicationCommandType, ContextMenuCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { ChannelsAPI } = require('@discordjs/core')
const { REST } = require('@discordjs/rest')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
	.setName('scrape-channel')
    .setDescription("TODO")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
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