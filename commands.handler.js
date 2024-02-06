import { RNG } from './utils.js';
import { rollDice, priceConverter, randomPriceGen } from './dndFunctions.js';
import { EmbedBuilder } from 'discord.js';
import stores from './store.json' assert { type: 'json' };

export async function commandRoll(interaction) {
    const maxOption = interaction.options.getNumber('max');
    const nDadi = interaction.options.getNumber('dadi') ?? 1;

    let rolls = [];
    for (let i = 0; i < nDadi; i++) {
        rolls.push(rollDice(maxOption));
    }

    const rollsSum = rolls.reduce((acc, value) => (acc += value), 0).toString();

    return await interaction.reply(`rolls: [${rolls.join(', ')}] = ${rollsSum}`);
}

export async function storeRefresh(interaction) {
    const city = interaction.options.getString('city');
    const cities = stores.cities;
    const currentCity = cities.filter((c) => {
        return c.name == city;
    });

    if (currentCity.length === 0) {
        return await interaction.reply(`Città non esistente`);
    }

    // const names = items.map((item) => item.id).join("\n");
    // const prices = items.map((item) => item.max_price).join("\n");
    //const shopHerbEmbedPrint = items.map((item) => `${(stores.erbe.filter(erba => erba.id === item.id)[0].name).padEnd(15, ' ')} (${item.max_price} Rin) x ${item.max_quantita}`).join("\n")

    const allItems = {
        ...stores.herbs,
        ...stores.potions,
        ...stores.minerals,
        ...stores.composts,
        ...stores.poisons,
        ...stores.projectiles,
        ...stores.scrolls,
    };

    const cityItems = currentCity[0].items.map((item) => {
        const currentItem = allItems[item.id];
        return {
            id: item.id,
            name: currentItem.name,
            type: currentItem.type,
            price: randomPriceGen(item.min_price, item.max_price),
            quantity: RNG(item.min_quantita, item.max_quantita),
        };
    });

    const mapItem = (currentCityHerb) => {
        return `\`\`\`\n${currentCityHerb.name}\n(${currentCityHerb.price}) x ${currentCityHerb.quantity}\`\`\``;
    };

    const shopHerbEmbedPrint = cityItems
        .filter((currentCityHerb) => {
            return currentCityHerb.quantity > 0 && currentCityHerb.type === 'herbs';
        })
        .map(mapItem)
        .join('\n');

    const shopPotionEmbedPrint = cityItems
        .filter((currentCityHerb) => {
            return currentCityHerb.quantity > 0 && currentCityHerb.type === 'potions';
        })
        .map(mapItem)
        .join('\n');

    const shopMineralEmbedPrint = cityItems
        .filter((currentCityHerb) => {
            return currentCityHerb.quantity > 0 && currentCityHerb.type === 'minerals';
        })
        .map(mapItem)
        .join('\n');

    const shopCompostEmbedPrint = cityItems
        .filter((currentCityHerb) => {
            return currentCityHerb.quantity > 0 && currentCityHerb.type === 'composts';
        })
        .map(mapItem)
        .join('\n');

    const shopPoisonEmbedPrint = cityItems
        .filter((currentCityHerb) => {
            return currentCityHerb.quantity > 0 && currentCityHerb.type === 'poisons';
        })
        .map(mapItem)
        .join('\n');

    const shopProjectileEmbedPrint = cityItems
        .filter((currentCityHerb) => {
            return currentCityHerb.quantity > 0 && currentCityHerb.type === 'projectiles';
        })
        .map(mapItem)
        .join('\n');

    const shopScrollEmbedPrint = cityItems
        .filter((currentCityHerb) => {
            return currentCityHerb.quantity > 0 && currentCityHerb.type === 'scrolls';
        })
        .map(mapItem)
        .join('\n');

    const HerbEmbed =
        shopHerbEmbedPrint.length === 0
            ? []
            : [
                  { name: 'Nome Erba | (Prezzo) | x Disponibili', value: shopHerbEmbedPrint },
                  // { name: "\u200B", value: "\u200B"},
              ];
    const PotionEmbed =
        shopPotionEmbedPrint.length === 0
            ? []
            : [
                  { name: 'Nome Pozione', value: shopPotionEmbedPrint },
                  // { name: "\u200B", value: "\u200B"},
              ];
    const MineralEmbed =
        shopMineralEmbedPrint.length === 0
            ? []
            : [
                  { name: 'Nome Minerale', value: shopMineralEmbedPrint },
                  // { name: "\u200B", value: "\u200B"},
              ];
    const CompostEmbed =
        shopCompostEmbedPrint.length === 0
            ? []
            : [
                  { name: 'Nome Composto', value: shopCompostEmbedPrint },
                  // { name: "\u200B", value: "\u200B"},
              ];
    const PoisonEmbed =
        shopPoisonEmbedPrint.length === 0
            ? []
            : [
                  { name: 'Nome Veleno', value: shopPoisonEmbedPrint },
                  // { name: "\u200B", value: "\u200B"},
              ];
    const ProjectileEmbed =
        shopProjectileEmbedPrint.length === 0
            ? []
            : [
                  { name: 'Nome Proiettile * proiettili acquistati', value: shopProjectileEmbedPrint },
                  // { name: "\u200B", value: "\u200B"}
              ];
    const ScrollEmbed =
        shopScrollEmbedPrint.length === 0
            ? []
            : [
                  { name: 'Nome Pergamena - Cerchio della magia', value: shopScrollEmbedPrint },
                  // { name: "\u200B", value: "\u200B"}
              ];

    // let shopHerbEmbedPrint=[]
    // let saltati=0
    // for (let i=0; i<shopHerbName.length; i++) {
    //     if (shopHerbQuantity[i]>0) {
    //         shopHerbEmbedPrint[i-saltati] = `${cityHerbs[i].name.padEnd(3, '=')} (${cityHerbs[i].price}) x ${cityHerbs[i].quantity}`
    //     } else { saltati++ }
    // }
    // shopHerbEmbedPrint = shopHerbEmbedPrint

    //const shopHerbEmbedPrint = items.map((item) => `${(stores.erbe[item.id+1].name).padEnd(15, ' ')} (${randomPriceGen(item.min_price,item.max_price)}) x ${RNG(item.min_quantita,item.max_quantita)}`).join("\n")
    const embedShop = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(`Mercato SETTIMANALE di ${currentCity[0].displayName.toUpperCase()}`)
        // .setURL('https://discord.js.org/')
        // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        // .setDescription('Some description here')
        // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            ...HerbEmbed,
            ...PotionEmbed,
            ...MineralEmbed,
            ...CompostEmbed,
            ...PoisonEmbed,
            ...ProjectileEmbed,
            ...ScrollEmbed
        );
    // .setImage('https://i.imgur.com/AfFp7pu.png')
    // .setTimestamp()
    // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    // const items = `\`\`\`json\n${JSON.stringify(currentCity[0].items, null, 2)}\`\`\``
    // return await interaction.reply(`Bravissimo sei nella città di : ${currentCity[0].displayName}\n ${items}`);

    return await interaction.reply({ embeds: [embedShop] });
}
