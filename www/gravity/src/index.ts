import { Canvas } from 'graphico';
import { GameMap } from './map';
import { Player } from './player';

const map: GameMap = new GameMap({ x: 101, y: 101 });
const player: Player = new Player(map);

const max_input_dt = 100;
let input_dt = 0;

export const canv: Canvas = new Canvas({
    width: 50,
    height: 50,
    scale: 10,
    background: 'dimgray',
    border: 'black',
    borderBlur: 'gray',
    loop(dt) {
        input_dt += dt;
        if (input_dt > max_input_dt) {
            input_dt %= max_input_dt;
            if (canv.isKeyDown('arrowleft') || canv.isKeyDown('a')) {
                player.movePlayer('left');
            }
            if (canv.isKeyDown('arrowright') || canv.isKeyDown('d')) {
                player.movePlayer('right');
            }
            if (canv.isKeyDown('arrowup') || canv.isKeyDown('w')) {
                player.movePlayer('up');
            }
            if (canv.isKeyDown('arrowdown') || canv.isKeyDown('s')) {
                player.movePlayer('down');
            }
        }
        canv.clear();
        canv.draw(player);
    },
});
