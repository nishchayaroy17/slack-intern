import { Wheel } from 'spin-wheel';

// Mock container
const canvas = {
  style: {},
  getContext: () => ({
    scale: () => {},
    translate: () => {},
    clearRect: () => {},
    restore: () => {},
    save: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    closePath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    measureText: () => ({ width: 10 }),
    fillText: () => {}
  }),
  addEventListener: () => {},
  removeEventListener: () => {}
};

try {
  const w1 = new Wheel(canvas, { items: [{label: "1"}, {label: "2"}] });
  console.log("w1 pointerAngle default:", w1.pointerAngle);
  
  const w2 = new Wheel(canvas, { items: [{label: "1"}], pointerAngle: 270 });
  console.log("w2 pointerAngle init:", w2.pointerAngle);
} catch (e) {
  console.log("Error:", e.message);
}
