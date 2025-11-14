import { Canvas, Drawable } from 'graphico';

const G = 9.81; // [m/s^2]
const px_per_m = 100;

class Player implements Drawable {
    private y = 0;
    private dy = 0;
    constructor(private readonly color: string, private readonly width: number, private readonly height: number) { }
    public draw(graphics: CanvasRenderingContext2D): void {
        graphics.fillStyle = this.color;
        graphics.fillRect((game.width - this.width) / 2, this.y, this.width, this.height);
    }
    public step(dt: number): void {
        this.dy += G * px_per_m * dt / 1000;
        this.y += this.dy * dt / 1000;
        if (this.y + this.height >= game.height) {
            this.y = game.height - this.height;
            this.dy = 0;
        }
    }
    public jump(force: number): void {
        if (this.dy === 0) {
            this.dy = -force;
        }
    }
}

const me: Player = new Player('red', 50, 50);

const game: Canvas = new Canvas({
    background: 'skyblue',
    border: 'black',
    borderBlur: 'gray',
    loop(dt) {
        me.step(dt);
        game.clear();
        game.draw(me);
    },
    keydown(key) {
        if (key === ' ') {
            me.jump(500);
        }
    },
});