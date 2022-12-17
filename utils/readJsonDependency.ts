import { readFileSync } from 'fs';

import buildResolver from 'esm-resolve';

/**
 * This JS file should not necessarily be real,
 * it's merely a starting point for module resolution
 */
const resolve = buildResolver('./hypothetical.js');

/**
 *
 * @param {string} jsonPackagePath Path to a JSON file in node_modules
 * @returns {unknown} Data from JSON file
 * @example readJsonDependency('@mdn/browser-compat-data/data.json')
 */
export default function readJsonDependency(jsonPackagePath: string): any {
  return JSON.parse(readFileSync(resolve(jsonPackagePath), 'utf-8'));
}
