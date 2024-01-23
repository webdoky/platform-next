// import { type Output, object, optional, parse, string } from 'valibot';
// const HitSchema = object({
//   content: string(),
//   description: string(),
//   'page-type': optional(string()),
//   section: string(),
//   slug: string(),
//   title: string(),
// });

// export type Hit = Output<typeof HitSchema>;
export interface Hit {
  content: string;
  description: string;
  section: string;
  slug: string;
  title: string;
  [key: string]: unknown;
}

// export default function validateHit(prebuildResultItem: unknown): Hit {
//   return parse(HitSchema, prebuildResultItem);
// }
