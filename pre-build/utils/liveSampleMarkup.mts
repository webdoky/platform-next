const defaultSampleHead = `
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<style>
  body {
    background: #fff;
  }
  .missing-sample__body {
    background: #fef9c3;
  }
</style>
`;

export const liveSampleMarkup = ({
  html,
  css,
  js,
}: {
  html?: string;
  css?: string;
  js?: string;
}) =>
  `<!DOCTYPE html>
<html>
  <head>
    ${defaultSampleHead}
    ${css ? `<style>${css}</style>` : ''}
  </head>
  <body>
    ${html ? html : ''}
    ${js ? `<script>${js}</script>` : ''}
  </body>
</html>`.trim();

export const missingSampleMarkup = () =>
  `<!DOCTYPE html>
<html>
  <head>
    ${defaultSampleHead}
  </head>
  <body class="missing-sample__body">
    Схоже, цей зразок зараз недоступний.
  </body>
</html>`.trim();
