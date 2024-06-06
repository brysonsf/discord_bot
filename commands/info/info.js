const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Provides information about the bots found on the server and their usages.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Provides information about the server.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('scryfall')
                .setDescription('Get information about the birthdays category commands')
        ),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
        if(interaction.options.getSubcommand()=='server'){
            await interaction.reply({content: `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`, ephemeral: true});
        }
        else if(interaction.options.getSubcommand()=='scryfall'){
            await interaction.reply({content:`This scryfall bot has 4 main functions: 
            [[card name]] - looks up a card. can tolerate slight mispelling / name fragments. no punctualization or capitalizaiton needed

            [[!card name]] - ! before card name pulls up image.

            [[$card name]] - $ before card name pulls up prices.

            [[?card name]] - ? before card name pulls up rulings.

            [[#card name]] - # before card name pulls up format legality.
        `, ephemeral: true});
        }
        else{
            await interaction.reply({content:'An unknown issue has occured with the info command', ephemeral: true });
        }
	},
};