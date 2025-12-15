import { Drawable } from 'graphico';
import { Direction, move, Vec2 } from './types';
import { GameMap } from './map';

export class Player implements Drawable {
    constructor(private location: Vec2, private readonly map: GameMap) { }
    public movePlayer(direction: Direction): void {
        if (this.map.isWalkable(this.location, direction)) {
            this.location = move(this.location, direction);
        }
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.save();
        graphics.translate(this.location.x, this.location.y);
        this.map.draw(graphics);
        graphics.fillStyle = 'red';
        graphics.fillRect(0, 0, 1, 1);
        graphics.restore();
    }
}