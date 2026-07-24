import { Service } from '@angular/core';
import { BrawlerInfo } from './brawler';
import { BRAWLERS, RARITIES, CLASSES } from './brawlers.data';

@Service()
export class BrawlerService {
    getRarities() {
        return RARITIES;
    }

    getClasses() {
        return CLASSES;
    }

    getBrawlers(): BrawlerInfo[] {
        return BRAWLERS;
    }

    getColor(rarity: string): string {
        switch (rarity) {
        case 'Common': return '#4FC3F7';
        case 'Rare': return '#4CAF50';
        case 'Super Rare': return '#2196F3';
        case 'Epic': return '#9C27B0';
        case 'Mythic': return '#eb1212';
        case 'Legendary': return '#FFEB3B';
        case 'Ultra Legendary': return '#2e0051';
        default: return 'black';
        }
    }
}
