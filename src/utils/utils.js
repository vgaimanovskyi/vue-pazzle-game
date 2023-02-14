export function getRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red},${green},${blue})`;
}
export function replacePiece(array, item, position) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
    if (position === "end") array.push(item);
    if (position === "start") array.unshift(item);
  }
  return array;
}

export function distance(p1, p2) {
  return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}
