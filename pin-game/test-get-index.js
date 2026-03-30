import { Wheel } from 'spin-wheel';

const canvas = {
  style: {}, getContext: () => ({scale:()=>{}, translate:()=>{}, clearRect:()=>{}, restore:()=>{}, save:()=>{}, beginPath:()=>{}, arc:()=>{}, fill:()=>{}, closePath:()=>{}, moveTo:()=>{}, lineTo:()=>{}, stroke:()=>{}, measureText:()=>({width:10}), fillText:()=>{}}),
  addEventListener:()=>{}, removeEventListener:()=>{}
};

const w = new Wheel(canvas, {
  items: [
    { label: "0" }, { label: "1" }, { label: "2" }, { label: "3" }
  ],
  pointerAngle: 270
});

// We want to simulate the exact wheel rotation.
w.rotation = 90; // "Two" on left, "Three" on top
console.log("At rotation 90, currentIndex is:", w.getCurrentIndex());

w.rotation = 0;
console.log("At rotation 0, currentIndex is:", w.getCurrentIndex());
