// Eagerly import all PNG assets — Vite resolves URLs at build time
const pngModules = import.meta.glob('./assets/**/*.png', { eager: true });

// Eagerly import all TXT assets as raw strings
const txtModules = import.meta.glob('./assets/**/*.txt', { eager: true, query: '?raw' });

/**
 * Get the processed image URL for a group/challenge asset.
 * @param {string} group      - e.g. 'g1'
 * @param {string} challenge  - e.g. 'c1'
 * @param {string} type       - 'guess' | 'answer' | 'flag' | 'mascot'
 * @returns {string|null}
 */
export function getImageUrl(group, challenge, type) {
  const key = `./assets/${group}/${challenge}-${type}.png`;
  return pngModules[key]?.default ?? null;
}

/**
 * Get the dark/hidden flag image for a group.
 * @param {string} group - e.g. 'g1'
 * @returns {string|null}
 */
export function getDarkFlagUrl(group) {
  return pngModules[`./assets/${group}/darkflag.png`]?.default ?? null;
}

/**
 * Get raw text content for a group/challenge hint file.
 * @param {string} group      - e.g. 'g1'
 * @param {string} challenge  - e.g. 'c1'
 * @param {string} type       - 'pinpoint' | 'mascot'
 * @returns {string|null}
 */
export function getTextContent(group, challenge, type) {
  const key = `./assets/${group}/${challenge}-${type}.txt`;
  return txtModules[key]?.default ?? null;
}

/**
 * Get the four mascot wheel images (c1–c4) for a group.
 * Returns null entries for challenges that have no assets yet.
 * @param {string} group - e.g. 'g1'
 * @returns {(string|null)[]}
 */
export function getGroupMascots(group) {
  return ['c1', 'c2', 'c3', 'c4'].map((c) => getImageUrl(group, c, 'guess'));
}
