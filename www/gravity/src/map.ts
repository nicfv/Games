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
        this.step({
            x: SMath.rint(0, this.size.x / 2 - 1) * 2 + 1,
            y: SMath.rint(0, this.size.y / 2 - 1) * 2 + 1,
        });
    }
    public getTileAt(location: Vec2): TileType {
        return this.tiles[location.x]?.[location.y] ?? 'void';
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
    private step(location: Vec2): void {
        this.tiles[location.x][location.y] = 'path';
        const directions: Direction[] = SMath.shuffle(Object.keys(DELTAS) as Direction[]);
        for (const direction of directions) {
            const mid: Vec2 = {
                x: location.x + DELTAS[direction].x,
                y: location.y + DELTAS[direction].y,
            };
            const dest: Vec2 = {
                x: location.x + DELTAS[direction].x * 2,
                y: location.y + DELTAS[direction].y * 2,
            };
            const tile: TileType = this.getTileAt(dest);
            if (tile === 'wall') {
                this.tiles[mid.x][mid.y] = 'path';
                this.step(dest);
            }
        }
    }
}

type TileType = 'void' | 'wall' | 'path';
type Direction = 'left' | 'right' | 'up' | 'down';

const DELTAS: Record<Direction, Vec2> = {
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    up: { x: 0, y: -1 },
};
