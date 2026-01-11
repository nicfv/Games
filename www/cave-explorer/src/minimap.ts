import { Drawable } from 'graphico';
import { GameMap } from './map';
import { Player } from './player';
import { Collectibles } from './collectible';

export class Minimap implements Drawable {
    constructor(private readonly map: GameMap, private readonly player: Player, private readonly collectibles: Collectibles) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.');
    }
}