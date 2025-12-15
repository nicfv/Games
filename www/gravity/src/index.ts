import { Canvas } from 'graphico';
import { GameMap } from './map';

const map: GameMap = new GameMap({ x: 51, y: 51 });

export const canv: Canvas = new Canvas({
    width: 51,
    height: 51,
    scale: 10,
    background: 'blue',
    border: 'black',
    borderBlur: 'gray',
    keydown(key) {
        console.log(key);
    },
    keyup(key) {
        console.log(key);
    },
    loop(dt) {
        canv.draw(map);
    },
});
