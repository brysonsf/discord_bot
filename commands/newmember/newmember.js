const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newmember')
    .setDescription('Give self the only relevant role.'),
  async execute(interaction) {
    const guild = interaction.guild;
    const role = guild.roles.cache.find(role => role.name === 'gamerz'); // Find role in cached roles
    const member = interaction.member; // Guild member
    try {
      await member.roles.add(role);
      await interaction.reply({content:`You are officially one of the ${role.name}! Welcome, ${member.user.username}.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({content:'There was an error giving the role.', ephemeral: true });
    }
  },
};