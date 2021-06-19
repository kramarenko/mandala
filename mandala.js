const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.backgroundColor = 'rgba(5, 12, 0, 1)';

const centerX = canvas.width / 2;
const centery = canvas.height / 2;
const NUM = 300;
const RADIUS = 100;

const settings = {
	hsl: false,
	fill: true,
	radius: 200,
	period: 15,
	amp: 22,
	numberOfCircles: 7,
	speed: 100,
	color: [24, 128, 255],
};

const  gui = new dat.GUI();
gui.add(settings, 'fill');
gui.add(settings, 'hsl');
gui.add(settings, 'amp', 0, 40).step(1);
gui.add(settings, 'period', 0, 40).step(1);
gui.add(settings, 'radius', 100, 400).step(1);
gui.add(settings, 'numberOfCircles', 1, 25).step(1);
gui.add(settings, 'speed', 0.5, 400);
gui.addColor(settings, 'color');



function drawCircle(radius, color, offset) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i <= NUM; i++) {
        const teta = (i * 2 * Math.PI) / NUM;
        const varRadius = radius + settings.amp * Math.sin(teta * settings.period + offset);

        const x = centerX + varRadius * Math.cos(teta);
        const y = centery + varRadius * Math.sin(teta);


        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.strokeStyle = '#ffffff';

    if (settings.fill) {
        ctx.fill();
    } else {
        ctx.stroke();
    }


}

let time = 0;
function draw() {
    time++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < settings.numberOfCircles; i++) {
        let color = i % 2 ? 'black' : 'white';
        if (settings.hsl) {
            // const [r, g, b] = settings.color;
            // const { h, l, s } = R_G_BtoHSL(r, g, b);
                        // color = `hsl(${h * i},${s}%, ${l}%)`;
            color = 'hsl(' + i * settings.color[0] + ', 70%, 66%)';
        }

        drawCircle(
            settings.radius - i * 10,
            color,
            settings.speed*time/(1000+50*i)
        );
    }
}

function render() {
    draw();
    requestAnimationFrame(render);
}

render();

function R_G_BtoHSL(red, green, blue) {
	red = red < 0 ? 0 : red > 255 ? 255 : red;
	green = green < 0 ? 0 : green > 255 ? 255 : green;
	blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;

	var r = red / 255,
		g = green / 255,
		b = blue / 255,
		min = Math.min(r, g, b),
		max = Math.max(r, g, b),
		delta = max - min,
		h,
		s,
		l;
	if (max == min) {
		h = 0;
	} else if (r == max) {
		h = (g - b) / delta;
	} else if (g == max) {
		h = 2 + (b - r) / delta;
	} else if (b == max) {
		h = 4 + (r - g) / delta;
	}
	h = Math.min(h * 60, 360);
	if (h < 0) h += 360;
	l = (min + max) / 2;
	if (max == min) s = 0;
	else if (l <= 0.5) s = delta / (max + min);
	else s = delta / (2 - max - min);
	return {
		h: Math.round(h),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
}


