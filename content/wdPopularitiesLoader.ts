import readJsonDependency from '../utils/readJsonDependency';

const popularitiesJson = readJsonDependency('@mdn/yari/popularities.json');

interface PopularityItem {
  link: string;
  popularity: number;
}

const sourceLocale = process.env.SOURCE_LOCALE;
const targetLocale = process.env.TARGET_LOCALE;

export default class PopularitiesLoader {
  static getAll(): PopularityItem[] {
    const popularities = popularitiesJson;

    return Object.keys(popularitiesJson)
      .filter((key) => key.includes(sourceLocale))
      .map((key) => {
        return {
          link: key.replace(`/${sourceLocale}/`, `/${targetLocale}/`),
          popularity: popularities[key],
        };
      });
  }
}
