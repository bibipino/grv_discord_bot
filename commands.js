import { SlashCommandBuilder } from 'discord.js';
import stores from './store.json' assert { type: 'json' }; 

const cities = stores.cities.map((city) => {
    return { "name": city.displayName, "value": city.name }
})

export default [
    new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Rolla i dadi")
        .addNumberOption((optionBuilder) => {
            return optionBuilder
                .setName("max")
                .setDescription("max")
        })
        .addNumberOption((optionBuilder) => {
            return optionBuilder
                .setName("dadi")
                .setDescription("Quanti dadi dovrei tirare?")
        }),
    new SlashCommandBuilder()
        .setName("store")
        .setDescription("Visit city store")
        .addStringOption((optionBuilder) => {
            return optionBuilder
                .setName("city")
                .setDescription("name of the city")
                .addChoices(...cities)
                .setRequired(true)
        }),
]
