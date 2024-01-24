import { TOKEN, CLIENT_ID, CLIENT_SECRET } from 'auth.js';
import { REST, Routes, Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';
import { commandRoll, storeRefresh } from './commands.handler.js';
import commandsList from './commands.js';


//GUARDA SE I COMANDI SONO ARRIVATI A DISCORD
const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commandsList });
} catch (error) {
  console.error(error);
}

//SECONDA PARTE DA discord.js
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//COMANDI CON REPLY

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'roll') await commandRoll(interaction);
  if (interaction.commandName === 'store') await storeRefresh(interaction);
});

client.login(TOKEN);