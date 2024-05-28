const Discord = require('discord.js');

module.exports = async (db, client, interaction, args) => {
	

    const day = interaction.options.getNumber('day');
    const month = interaction.options.getNumber('month');

    if (!day || day > 31) return client.errNormal({ 
        error: "Wrong day format!",
        type: 'editreply'
    }, interaction);

    if (!month || month > 12) return client.errNormal({
        error: "Wrong month format!",
        type: 'editreply'
    }, interaction);

	console.log(month, day);
	console.log(client);
	//await db.collection('birthdays').doc(month).doc(day).set(client.user);
}

 