function parseGrid(grid: string[]): string[] {
  let maxX = -Infinity,
    maxY = -Infinity;
  let minX = Infinity,
    minY = Infinity;

  grid.forEach((coord) => {
    const [x, y] = coord.split(',').map(Number);
    if (x > maxX) maxX = x;
    if (x < minX) minX = x;
    if (y > maxY) maxY = y;
    if (y < minY) minY = y;
  });

  const centerX = Math.floor((maxX + minX) / 2);
  const centerY = Math.floor((maxY + minY) / 2);

  return grid.map((coord) => {
    const [x, y] = coord.split(',').map(Number);
    const shiftedX = x - centerX;
    const shiftedY = y - centerY;
    return `${shiftedX},${shiftedY}`;
  });
}

export default parseGrid;
