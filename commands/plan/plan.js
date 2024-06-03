const { GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('plan')
		.setDescription('Provides information about the bots found on the server and their usages.'),
	async execute(interaction) {
        const eventChannel = await interaction.client.channels.fetch('1247313316578070599');
        eventChannel.send({content: `/create title: Commander Sesh datetime: 6/10 16:00 description: Commander? I hardly knower! RSVP here!`, ephemeral: true });
        await interaction.reply({content: 'RSVP in events channel to confirm!', ephemeral: true});
	},
};