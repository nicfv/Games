import { Drawable } from 'graphico';
import { Vec2 } from './types';
import * as SMath from 'smath';

export class GameMap implements Drawable {
    private static tileSize: Vec2 = { x: 1, y: 1 };
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
        this.addRooms(2, 8);
        this.clean();
    }
    private getTileAt(location: Vec2): TileType {
        return this.tiles[location.x]?.[location.y] ?? 'void';
    }
    private move(location: Vec2, direction: Direction, distance: number = 1): Vec2 {
        return {
            x: location.x + DELTAS[direction].x * distance,
            y: location.y + DELTAS[direction].y * distance,
        };
    }
    public isWalkable(location: Vec2, direction: Direction): boolean {
        const tile: TileType = this.getTileAt(this.move(location, direction));
        return tile === 'path' || tile === 'room';
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const tile: TileType = this.getTileAt({ x: x, y: y });
                if (tile === 'path') {
                    graphics.fillStyle = 'green';
                } else if (tile === 'room') {
                    graphics.fillStyle = 'lime';
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
            const mid: Vec2 = this.move(location, direction);
            const dest: Vec2 = this.move(location, direction, 2);
            const tile: TileType = this.getTileAt(dest);
            if (tile === 'wall') {
                this.tiles[mid.x][mid.y] = 'path';
                this.step(dest);
            }
        }
    }
    private addRooms(minRooms: number, maxTries: number): void {
        let tries: number = 0;
        let rooms: number = 0;
        while (tries < maxTries || rooms < minRooms) {
            tries++;
            const location: Vec2 = {
                x: SMath.rint(0, this.size.x / 2 - 3) * 2 + 1,
                y: SMath.rint(0, this.size.y / 2 - 3) * 2 + 1,
            };
            const size: Vec2 = {
                x: SMath.rint(0, 5) * 2 + 3,
                y: SMath.rint(0, 5) * 2 + 3,
            };
            const bottomRight: Vec2 = {
                x: location.x + size.x - 1,
                y: location.y + size.y - 1,
            };
            if (bottomRight.x >= this.size.x || bottomRight.y >= this.size.y) {
                continue;
            }
            for (let x = location.x; x <= bottomRight.x; x++) {
                for (let y = location.y; y <= bottomRight.y; y++) {
                    this.tiles[x][y] = 'room';
                }
            }
            rooms++;
        }
    }
    private clean(): void {
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const location: Vec2 = { x: x, y: y };
                const tile: TileType = this.getTileAt(location);
                const count: number = this.countAround(location);
                if ((tile === 'path' || tile === 'room') && count <= 1) {
                    this.cleanStep(location);
                } else if (tile === 'wall' && count === 4) {
                    this.tiles[x][y] = 'path';
                }
            }
        }
    }
    private countAround(location: Vec2): number {
        let count: number = 0;
        for (const direction in DELTAS) {
            if (this.isWalkable(location, direction as Direction)) {
                count++;
            }
        }
        return count;
    }
    private cleanStep(location: Vec2): void {
        this.tiles[location.x][location.y] = 'wall';
        for (const direction in DELTAS) {
            if (this.isWalkable(location, direction as Direction)) {
                const dest: Vec2 = this.move(location, direction as Direction);
                const count: number = this.countAround(dest);
                if (count <= 1) {
                    this.cleanStep(this.move(location, direction as Direction));
                }
            }
        }
    }
}

type TileType = 'void' | 'wall' | 'path' | 'room';
type Direction = 'left' | 'right' | 'up' | 'down';

const DELTAS: Record<Direction, Vec2> = {
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    up: { x: 0, y: -1 },
};
