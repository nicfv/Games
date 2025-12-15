import { Drawable } from 'graphico';
import { Tile } from './tile';
import { Point } from './point';

export class GameMap implements Drawable {
    constructor(private readonly tiles: Tile[]) { }
    public getTileAt(location: Point): Tile {
        return this.tiles.find(tile => tile.location.equals(location)) ?? new Tile(location, 'void');
    }
    public draw(graphics: CanvasRenderingContext2D): void {
        for (const tile of this.tiles) {
            tile.draw(graphics);
        }
    }
    public static generate(size: Point): GameMap {
        const ids: number[][] = [];
        for (let x = 0; x < size.x; x++) {
            ids[x] = [];
            for (let y = 0; y < size.y; y++) {
                ids[x][y] = x % y;
            }
        }
        const tiles: Tile[] = [];
        for (let x = 0; x < size.x; x++) {
            for (let y = 0; y < size.y; y++) {
                tiles.push(new Tile(new Point(x, y), ids[x][y] === 1 ? 'path' : 'wall'));
            }
        }
        return new GameMap(tiles);
    }
    private static step(location: Point, tiles: Tile[]): void {
        // const dir
    }
}