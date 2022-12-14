const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

var id = 'myCanvas';
const canvas = document.getElementById(id);
const context = canvas.getContext("2d");
canvas.height = 200;
var width = window.innerWidth;
//var width = 1080;
var frame = 0;
canvas.width = width;
const height = canvas.height;

var iter = 100;                     // Starting x-position for the rectangle
var requestId;
var offset = 0

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

const params = {
  cols: 400,
  rows: 10,
  scaleMin: 1,
  scaleMax: 2,
  freq: 0.003,
  speed: 1,
  slowdown_factor: 5,
  amp: 80,
  frame: 0,
  invert: false,
  animate: true,
  strokeColor: '#486860',
}

function moveLine() {
    context.fillStyle = '#E9F1FF';
    context.fillRect(0, 0, width, height);

    const marg = params.amp * 2 + params.scaleMax
    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;
    const gridw = width;
    const gridh = height - marg;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    let ns, nt

    context.lineCap = 'round';
    context.lineJoin = 'round';
    const strokeColor = params.strokeColor;
    params.invert ? context.strokeStyle = 'white' : context.strokeStyle = strokeColor;
    for (let i = 0; i < numCells; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)
        const x = col * cellw
        const y = row * cellh
        const w = cellw
        const h = cellh
        const f = params.animate ? frame : params.frame

        col == 0 ? ns = random.noise3D((col - 1) * cellw + offset, y + offset, f * params.speed, params.freq) : ns = nt
        nt = random.noise3D(x + offset, y + offset, f * params.speed, params.freq)
        offset += params.freq / params.slowdown_factor

        const scale = math.mapRange(ns, -1, 1, params.scaleMin, params.scaleMax);

        context.lineWidth = scale

        context.save()
        context.translate(0, marg * 0.5)
        context.translate(x, y)
        context.translate(cellw * 0.5, cellh * 0.5)
        context.beginPath()
        context.moveTo(w * -0.4, ns * params.amp)
        context.lineTo(w * 0.4, nt * params.amp)
        context.stroke()
        context.restore()
        }

    iter += 1;

    // Animates the rectangle and stores the ID in a variable
    requestId = requestAnimationFrame(moveLine);

    // When the x-position reaches 200, stop the animation
    if (iter > 2000) {
      cancelAnimationFrame(requestId);
    }

}
moveLine()
