const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

const centerX = 200;
const centery = 200;
const NUM = 300;
const RADIUS = 100;

for (let i = 0; i <= NUM; i++) {
    const teta = i * 2 * Math.PI / NUM;
    const varRadius = RADIUS + 10 * Math.sin(teta * 40) 
    const x = centerX + varRadius * Math.cos(teta);
    const y = centery + varRadius * Math.sin(teta);

    ctx.fillRect(x, y, 2, 2);

    // ctx.beginPath();
    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y)
    }
}
ctx.closePath();
ctx.stroke();
