import { Drawable } from 'graphico';
import { GameMap } from './map';
import { Player } from './player';
import { Collectibles } from './collectible';
import { Vec2 } from './types';

export class Minimap implements Drawable {
    constructor(private readonly location: Vec2, private readonly size: Vec2, private readonly map: GameMap, private readonly player: Player, private readonly collectibles: Collectibles) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.');
    }
}