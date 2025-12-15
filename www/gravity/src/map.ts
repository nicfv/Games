import { Drawable } from 'graphico';
import { Vec2 } from './types';
import * as SMath from 'smath';

export class GameMap implements Drawable {
    private static tileSize: Vec2 = { x: 10, y: 10 };
    private readonly tiles: TileType[][];
    constructor(private readonly size: Vec2) {
        this.tiles = [];
        for (let x = 0; x < size.x; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < size.y; y++) {
                this.tiles[x][y] = 'wall';
            }
        }
    }
    public getTileAt(location: Vec2): TileType {
        return this.tiles[location.x][location.y] ?? 'void';
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const tile: TileType = this.getTileAt({ x: x, y: y });
                if (tile === 'path') {
                    graphics.fillStyle = 'green';
                } else {
                    graphics.fillStyle = 'gray';
                }
                graphics.fillRect(x * GameMap.tileSize.x, y * GameMap.tileSize.y, GameMap.tileSize.x, GameMap.tileSize.y);
            }
        }
    }
}

type TileType = 'void' | 'wall' | 'path';
