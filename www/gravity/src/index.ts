import { Canvas } from 'graphico';
import { GameMap } from './map';
import { Point } from './point';

const map: GameMap = GameMap.generate(new Point(50, 30));

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
