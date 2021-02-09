/* eslint-disable no-undef */
// const player = document.querySelector(".player");
// const video = player.querySelector(".viewer");
const canvas = document.querySelector(".filterer");
const ctx = canvas.getContext("2d");

let redFilterValue = false;
let blueFilterValue = false;
let greenFilterValue = false;

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);

    if (redFilterValue) {
      pixels = redEffect(pixels);
    } else if (blueFilterValue) {
      pixels = blueEffect(pixels);
    } else if (greenFilterValue) {
      pixels = greenEffect(pixels);
    }

    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function blueEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 0; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 0; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 200; // Blue
  }
  return pixels;
}

function greenEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 0; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0; // Blue
  }
  return pixels;
}

function redFilter() {
  redFilterValue = !redFilterValue;
  greenFilterValue = false;
  blueFilterValue = false;
}

function blueFilter() {
  blueFilterValue = !blueFilterValue;
  greenFilterValue = false;
  redFilterValue = false;
}

function greenFilter() {
  greenFilterValue = !greenFilterValue;
  redFilterValue = false;
  blueFilterValue = false;
}

function resetFilter() {
  greenFilterValue = false;
  redFilterValue = false;
  blueFilterValue = false;
}

video.addEventListener("canplay", paintToCanvas);
