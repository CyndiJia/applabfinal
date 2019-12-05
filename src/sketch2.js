import { p } from './Sketch'
import { Circle } from 'react-shapes';

let timePrev = 0;
let timeCurr = 0;
let interval = 0;

// const [r,setr]=useState(" ");


function KeyPressed(){ 
    //count += 1;
    timeCurr = Date.now();
    interval = timeCurr - timePrev;
    console.log( interval );

    timePrev = timeCurr;
    // if(interval>100000000){
    //     inverval = 300;
    // }
}


    
    

let particles = Array(100).fill().map(makeParticle);


function makeParticle() {
    // return [Math.random() - 0.5, Math.random() - 0.5, 0, 0];
    return [window.innerWidth/2, window.innerHeight/2, 10*Math.random(), 10*Math.random()];
}

function moveParticle([x, y, dx, dy]) {
    const b = 0.99;
    dx *= b;
    dy *= b;
    x += dx;
    y += dy;
    // x = (x + p.width) % p.width;
    // y = (y + p.height) % p.height;
    return [x, y, dx, dy];
}

function drawParticle([x, y]) {
    p.fill('white')
    p.circle(x, y, 20, 20);
}

function repel(p1, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const f = -0.001;
    const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    if (d < 10) {
        const ddx = (x2 - x1) * f;
        const ddy = (y2 - y1) * f;
        p1[2] += ddx;
        p1[3] += ddy;
        p2[2] -= ddx;
        p2[3] -= ddy;

    }
}

function bounceParticles() {
    const particlesAndMouse = [
        [p.mouseX, p.mouseY, 0, 0], ...particles
    ];
    particlesAndMouse.forEach(p1 =>
        particlesAndMouse.forEach(p2 =>
            p1 !== p2 && repel(p1, p2)))
}


export function draw() {
    p.background(40);
    particles.forEach(bounceParticles);
    particles = particles.map(moveParticle);
    particles.forEach(drawParticle);
    p.fill(255,0,0);
    p.circle(window.innerWidth/2, window.innerHeight/2, 80,60);
}















