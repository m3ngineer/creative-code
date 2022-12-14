var id = 'myCanvas';
const canvas = document.getElementById(id);
const context = canvas.getContext("2d");
var EPSILON = Number.EPSILON;

var width = window.innerWidth;
var frame = 0;
canvas.width = width;
const height = 1080;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function mapRange (value, inputMin, inputMax, outputMin, outputMax, clamp) {
  // Reference:
  // https://openframeworks.cc/documentation/math/ofMath/
  if (Math.abs(inputMin - inputMax) < EPSILON) {
    return outputMin;
  } else {
    var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
    if (clamp) {
      if (outputMax < outputMin) {
        if (outVal < outputMax) outVal = outputMax;
        else if (outVal > outputMin) outVal = outputMin;
      } else {
        if (outVal > outputMax) outVal = outputMax;
        else if (outVal < outputMin) outVal = outputMin;
      }
    }
    return outVal;
  }
}

const params = {
  cols: 125,
  rows: 25,
  scaleMin: 1,
  scaleMax: 5,
  freq: 0.004,
  speed: 0.5,
  amp: 70,
  frame: 0,
  invert: false,
  animate: true,
};

function initSketch() {
    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;
    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridh / cols;
    const cellh = gridw / rows;
    const margx = (width - gridh) * 0.5;
    const margy = (height - gridh) * 0.5;

    const marg = params.amp * 2 + params.scaleMax
    let ns, nt

    context.lineCap = 'round'
    context.lineJoin = 'round'
    params.invert ? context.strokeStyle = 'white' : context.strokeStyle = 'black'

}
initSketch();

function sketch () {
    width = window.innerWidth;
    canvas.width = width;
    context.fillStyle = '#E9F1FF';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;
    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridh / cols;
    const cellh = gridw / rows;
    const margx = (width - gridh) * 0.5;
    const margy = (height - gridh) * 0.5;

    const marg = params.amp * 2 + params.scaleMax
    let ns, nt

    context.lineCap = 'round'
    context.lineJoin = 'round'
    params.invert ? context.strokeStyle = 'white' : context.strokeStyle = 'black'

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * cellw;
      const y = row * cellh;
      const w = cellw;
      const h = cellh;
      const f = params.animate ? frame : params.frame

      col == 0 ? ns = random.noise3D((col - 1) * cellw, y, f * params.speed, params.freq) : ns = nt
      nt = random.noise3D(x + 1, y, f * params.speed, params.freq)

      const scale = math.mapRange(ns, -1, 1, params.scaleMin, params.scaleMax);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5);

      context.beginPath();
      context.moveTo(w * -0.5, ns * params.amp);
      context.lineTo(w * 0.5, nt * params.amp);
      context.stroke();
      context.restore();

    }

    return agents
};

function animate() {
    sketch();
    requestAnimationFrame(animate);
}
animate();
