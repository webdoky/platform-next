import { toString } from 'mdast-util-to-string';
import slugger from 'github-slugger';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { visit, Node } from 'unist-util-visit';

export type HtmlNode = Node & {
  tagName?: string;
  properties?: { id?: string };
};

const slugs = slugger();

const transformer = (ast) => {
  slugs.reset();

  visit(
    ast,
    (node: HtmlNode) =>
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName),
    function (node) {
      let nodeContent = toString(node);
      if (/[а-яА-ЯіїІЇ]/.test(nodeContent)) {
        nodeContent = cyrillicToTranslit({ preset: 'uk' }).transform(
          nodeContent
        );
      }
      node.properties.id = slugs.slug(nodeContent);
    }
  );
};

const htmlSlugify = () => {
  return transformer;
};

export default htmlSlugify;
