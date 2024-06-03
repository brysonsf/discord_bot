const { SlashCommandBuilder } = require('discord.js');

// placed inside module.exports so they can be read by other files; namely the command loader and command deployment scripts
module.exports = {
	data: new SlashCommandBuilder() 
	// provides the command definition for registering to Discord.
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) { 
		// functionality to run from our event handler when the command is used.
		await interaction.reply({content:'Pong!', ephemeral: true});
	},
};