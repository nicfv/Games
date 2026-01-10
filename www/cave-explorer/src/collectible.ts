import { Drawable } from 'graphico';
import { tileSize, Vec2 } from './types';
import { GameMap } from './map';

export class Collectibles implements Drawable {
    constructor(map: GameMap) {
        // 
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.');
    }
}

export class Collectible implements Drawable {
    constructor(private readonly location: Vec2) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = 'lime';
        graphics.fillRect(this.location.x * tileSize.x, this.location.y * tileSize.y, tileSize.x, tileSize.y);
    }
}