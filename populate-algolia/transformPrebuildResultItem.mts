import {
  type Output,
  array,
  boolean,
  object,
  optional,
  parse,
  string,
  union,
} from 'valibot';
const PrebuildResultItemSchema = object({
  'browser-compat': optional(union([array(string()), string()])),
  content: string(),
  description: string(),
  hasContent: boolean(),
  'page-type': optional(string()),
  section: string(),
  slug: string(),
  'spec-urls': optional(union([array(string()), string()])),
  title: string(),
});

export type PrebuildResultItem = Output<typeof PrebuildResultItemSchema>;

export default function transformPrebuildResultItem(
  prebuildResultItem: unknown
): PrebuildResultItem {
  return parse(PrebuildResultItemSchema, prebuildResultItem);
}
