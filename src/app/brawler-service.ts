import { Service } from '@angular/core';
import { BrawlerInfo } from './brawler';

@Service()
export class BrawlerService {
    private rarities = [
        { id: 'Common', name: 'Common' },
        { id: 'Rare', name: 'Rare' },
        { id: 'Super Rare', name: 'Super Rare' },
        { id: 'Epic', name: 'Epic' },
        { id: 'Mythic', name: 'Mythic' },
        { id: 'Legendary', name: 'Legendary' },
        { id: 'Ultra Legendary', name: 'Ultra Legendary' }
    ];

    private classes = [
        {id: 'Damage Dealer', name: 'Damage Dealer'},
        {id: 'Marksman', name: 'Marksman'},
        {id: 'Tank', name: 'Tank'},
        {id: 'Assassin', name: 'Assassin'},
        {id: ' Support', name: ' Support'},
        {id: 'Controller', name: 'Controller'},
        {id: 'Artillery', name: 'Artillery'},
    ]

    private brawlers: BrawlerInfo[] = [
        { id: 1, name: 'Shelly', rarity: 'Common', class: 'Damage Dealer', image: 'images/brawlers/shelly.png' },
        { id: 2, name: 'Colt', rarity: 'Rare', class: 'Marksman', image: 'images/brawlers/colt.png' },
        { id: 3, name: 'El Primo', rarity: 'Rare', class: 'Tank', image: 'images/brawlers/el-primo.png' },
        { id: 4, name: 'Poco', rarity: 'Rare', class: 'Support', image: 'images/brawlers/poco.png' },
        { id: 5, name: 'Barley', rarity: 'Rare', class: 'Artillery', image: 'images/brawlers/barley.png' },
        { id: 6, name: 'Dynamike', rarity: 'Super Rare', class: 'Artillery', image: 'images/brawlers/dynamike.png' },
        { id: 7, name: 'Rico', rarity: 'Super Rare', class: 'Damage Dealer', image: 'images/brawlers/rico.png' },
        { id: 8, name: 'Edgar', rarity: 'Epic', class: 'Assassin', image: 'images/brawlers/edgar.png' },
        { id: 9, name: 'Piper', rarity: 'Epic', class: 'Marksman', image: 'images/brawlers/piper.png' },
        { id: 10, name: 'Frank', rarity: 'Epic', class: 'Tank', image: 'images/brawlers/frank.png' },
        { id: 11, name: 'Mortis', rarity: 'Mythic', class: 'Assassin', image: 'images/brawlers/mortis.png' },
        { id: 12, name: 'Spike', rarity: 'Legendary', class: 'Damage Dealer', image: 'images/brawlers/spike.png' },
        { id: 13, name: 'Leon', rarity: 'Legendary', class: 'Assassin', image: 'images/brawlers/leon.png' },
        { id: 14, name: 'Crow', rarity: 'Legendary', class: 'Assassin', image: 'images/brawlers/crow.png' }
    ];

    getRarities() {
        return this.rarities;
    }

    getClasses() {
        return this.classes;
    }

    getBrawlers(): BrawlerInfo[] {
        return this.brawlers;
    }
}
