import { p } from './Sketch'
// import { Circle } from 'react-shapes';

// let timePrev = 0;
// let timeCurr = 0;
// let interval = 0;
// let value = 20;
let MAX_AGE = 5000;
let times = [];
let explosion;
let s = 'Keep pressing the keys to kill your stress';


// const [r,setr]=useState(" ");


export function keyPressed(){ 
    times = [...times, new Date()];
    //count += 1;
    // timeCurr = Date.now();
    // interval = timeCurr - timePrev;
    

    // timePrev = timeCurr;
    // if(interval>10000000){
    //     interval = 200;
    // }
    // value = p.map(interval, 0,2000,300,20);
    // console.log( "inter: "+interval+" "+"val: "+value );

    // if(interval>100000000){
    //     inverval = 300;
    // }
}


let particles = Array(100).fill().map(makeParticle);


function makeParticle() {
    return [window.innerWidth/2, window.innerHeight/2, 20*Math.random(), 20*Math.random()];
}

function moveParticle([x, y, dx, dy]) {
    const b = 0.99;
    dx *= b;
    dy *= b;
    x += dx;
    y += dy;
    return [x, y, dx, dy];
}

function drawParticle([x, y]) {
    p.noStroke();
    p.fill(255,0,0);
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

export function setup() {
    p.textSize(32)
    p.fill(255);
    p.text(s, 100, 100);
    explosion = p.loadSound('./exp2.wav');
  }


export function draw() {
    
    p.background(0);
    p.fill(255,0,0);
    // p.background(220)
    let now = new Date()
    times = times.filter(function(t){return t>now-MAX_AGE});
    let sum = times
                .map(function(t){return t-now+MAX_AGE})
                .map(n => n  / MAX_AGE)
                .map(n => n**2)
                .reduce((a, b) => a + b, 0)
    let radius = p.map(sum, 0,10, 10, 200);
    console.log(radius);
    p.fill(255,0,0);
    p.noStroke();
    p.circle(window.innerWidth / 2, window.innerHeight / 2, radius)
    if(radius>500){
        p.fill(255);
        p.circle(window.innerWidth / 2, window.innerHeight / 2, 1500); 
        explosion.play();    
        particles.forEach(bounceParticles);
        particles = particles.map(moveParticle);
        particles.forEach(drawParticle);
        
    }
   
   
}















