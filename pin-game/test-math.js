const list = [
      { label: "One" }, { label: "Two" }, { label: "Three" }, { label: "Four" }
];
let counts = [0,0,0,0,0,0];
for (let i = 0; i < 1000; i++) {
  const c = Math.floor(Math.random() * list.length);
  counts[c]++;
}
console.log(counts);
