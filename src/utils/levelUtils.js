import level from 'levels/level1.json';

export const tileSize = 50;

export function getTextureCode(x, y) {
  return level.codes[level.tiles[y][x]];
}

export function tileIsWalkable(x, y) {
  const code = level.tiles[y][x];

  return (code && code[0] === '1');
}

export function findNearestTile(x, y) {
  const width = level.tiles[0].length * tileSize;
  const height = level.tiles.length * tileSize;

  if (x > width || y > height) return;

  const tileX = Math.floor(x / tileSize);
  const tileY = Math.floor(y / tileSize);

  if (tileIsWalkable(tileX, tileY)) return false;

  return {
    x: tileX,
    y: tileY,
  };
}
