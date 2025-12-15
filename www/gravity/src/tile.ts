import { Drawable } from 'graphico';
import { Point } from './point';

export class Tile implements Drawable {
    private static readonly size: Point = new Point(10, 10);
    constructor(public readonly location: Point, public readonly tileType: TileType = 'void') { }
    public draw(graphics: CanvasRenderingContext2D): void {
        switch (this.tileType) {
            case ('wall'): {
                graphics.fillStyle = 'gray';
                break;
            }
            case ('path'): {
                graphics.fillStyle = 'green';
                break;
            }
            default: {
                return;
            }
        }
        graphics.fillRect(this.location.x * Tile.size.x, this.location.y * Tile.size.y, Tile.size.x, Tile.size.y);
    }
}

export type TileType = 'void' | 'wall' | 'path';
