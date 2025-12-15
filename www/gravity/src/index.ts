import { Canvas } from 'graphico';
import { GameMap } from './map';

const map: GameMap = new GameMap({ x: 21, y: 21 });

export const canv: Canvas = new Canvas({
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
