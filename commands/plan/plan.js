const { ComponentType, EmbedBuilder , SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, codeBlock } = require('discord.js');
const emojis = {
    ohyea: '⏫',
    no: '👤',
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plan')
		.setDescription('Provides information about the bots found on the server and their usages.')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('The date to schedule this for (ex/ 05 October 2011)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('The time to schedule this for (ex/ 14:48)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('The amount of time (in milliseconds) to schedule this for (ex/ 604800000 === 1 week')
                .setRequired(true)
        ),
	async execute(interaction) {
        //const eventChannel = await interaction.client.channels.fetch('1247313316578070599');
        
        const dateOfPlay = interaction.options.getString('date') + ' ';
        const timeOfPlay = interaction.options.getString('time') + ' ';
        const pollTime = interaction.options.getString('duration');
        const highlighted = codeBlock('js', dateOfPlay);
        
        /* below date time ISO conversion not working, need ISO for google cal implementation
        const date = new Date(dateOfPlay + timeOfPlay + ' AST');
        const ISOTime = date.toISOString();

        const d = new Date(); // Create a new Date object with the current date and time
        const isoString = d.toISOString(); // Convert the Date object to an ISO string
        console.log(isoString); // Output: 2024-06-03T21:33:10.000Z
        console.log(ISOTime);
        let gCal = 'http://www.google.com/calendar/event?action=TEMPLATE&text=Commander%20Sesh&dates=' + ISOTime + '&details=Commander?%20I%20hardly%20knower!%20RSVP%20here!&location=5217%South%20St';
        */
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Commander Sesh')
            //.setURL(gCal)
            .setURL('https://github.com/brysonsf')
            .setDescription('Commander? I hardly knower! RSVP here!')
            .setThumbnail('https://i.imgur.com/KJkSGXI.jpeg')
            .addFields(
                { name: 'Date / Time', value: highlighted},
            )
            .setImage('https://i.imgur.com/YGtKr7j.jpeg')
            .setFooter({ text: 'RSVP Please', iconURL: 'https://i.imgur.com/KJkSGXI.jpeg' })

		const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('RSVP')
			.setStyle(ButtonStyle.Primary);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cant')
			.setStyle(ButtonStyle.Danger);

		const row = new ActionRowBuilder()
			.addComponents(confirm, cancel);

		const response = await interaction.reply({
			content: 'event for date/time: ' + dateOfPlay,
			components: [row],
            embeds: [exampleEmbed]
		});

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: pollTime });

        collector.on('collect', i => {
            i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    },
};
