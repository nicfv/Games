import { Canvas } from 'graphico';
import { GameMap } from './map';
import { Player } from './player';

const map: GameMap = new GameMap({ x: 51, y: 51 });
const player: Player = new Player({ x: 1, y: 1 }, map);

export const canv: Canvas = new Canvas({
    width: 51,
    height: 51,
    scale: 10,
    background: 'blue',
    border: 'black',
    borderBlur: 'gray',
    keydown(key) {
        if (key === 'arrowleft') {
            player.movePlayer('left');
        }
        if (key === 'arrowright') {
            player.movePlayer('right');
        }
        if (key === 'arrowup') {
            player.movePlayer('up');
        }
        if (key === 'arrowdown') {
            player.movePlayer('down');
        }
    },
    keyup(key) {
        console.log(key);
    },
    loop(dt) {
        canv.draw(player);
    },
});
