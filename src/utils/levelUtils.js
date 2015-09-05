import level from 'levels/level1.json';

export const tileSize = 50;

export function getTextureCode(x, y) {
  return level.codes[level.tiles[y][x]];
}

export function tileIsWalkable(x, y) {
  const code = level.tiles[y][x];

  return (code && code[0] === '1');
}
