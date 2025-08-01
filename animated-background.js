// animated-background.js
const gradients = [
  ['#0f2027', '#2c5364', '#1c92d2', '#f2fcfe'],
  ['#fc00ff', '#00dbde', '#00c3ff', '#ffff1c'],
  ['#ad5389', '#3c1053', '#1c92d2', '#f2fcfe'],
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  let bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

const section = document.querySelector('.solutions-section');
let frame = 0;
let gradIdx = 0;
let nextIdx = 1;
let duration = 600;
let colorsA = gradients[gradIdx].map(hexToRgb);
let colorsB = gradients[nextIdx].map(hexToRgb);

function animate() {
  let t = (frame % duration) / duration;
  let currentColors = colorsA.map((a, i) =>
    rgbToHex(
      Math.round(lerp(a[0], colorsB[i][0], t)),
      Math.round(lerp(a[1], colorsB[i][1], t)),
      Math.round(lerp(a[2], colorsB[i][2], t))
    )
  );
  section.style.background = `linear-gradient(-45deg, ${currentColors.join(', ')})`;
  section.style.backgroundSize = '400% 400%';

  frame++;
  if (frame % duration === 0) {
    gradIdx = nextIdx;
    nextIdx = (nextIdx + 1) % gradients.length;
    colorsA = gradients[gradIdx].map(hexToRgb);
    colorsB = gradients[nextIdx].map(hexToRgb);
  }
  requestAnimationFrame(animate);
}

animate();
