import { ContentItem } from '../content/wdContentLoader';
import classNames from 'classnames';
import { GithubIcon, GlobeIcon, CopyIcon, TerminalIcon } from './icons';
import CopyToClipboard from './copyToClipboard';

interface Params {
  page: Partial<ContentItem & { popularity: number }>;
  includePopularity: boolean;
}

export default function TranslationStatusRow({
  page,
  includePopularity,
}: Params) {
  const { title, path, updatesInOriginalRepo: updates, originalPath } = page;
  const linkToRawOriginalGithubContent = `https://raw.githubusercontent.com/mdn/content/main/files/en-us${originalPath}`;
  const baseRepoPath = 'files/uk';
  const tree = page.originalPath
    .replace('/index.html', '')
    .replace('/index.md', '');

  const bashCommand = `mkdir -p ${baseRepoPath}${tree} && wget -O ${baseRepoPath}${originalPath} ${linkToRawOriginalGithubContent}`;

  const changes = updates
    ? `(нові зміни: ${updates
        .map(
          (commit) =>
            `[${commit.slice(0, 7)}](https://github.com/mdn/content/commit/${
              commit.split(' - ')[0]
            })`
        )
        .join(', ')})`
    : '';

  const listOfChanges = `[${title}](${path})${changes ? `, ${changes}` : ''}`;

  return (
    <tr>
      {includePopularity && <td>{page.popularity}</td>}
      <td
        className={classNames({
          'doc-status--not-translated': !page.hasContent,
          'doc-status--translated': page.hasContent,
          'doc-status--up-to-date': !page.updatesInOriginalRepo.length,
        })}
      >
        <div className="flex flex-row justify-between">
          <span className={`mb-0 ${includePopularity ? '' : 'pl-4'}`}>
            <a
              className="underline"
              href={page.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              {page.title}
            </a>
            {page.updatesInOriginalRepo.length ? (
              <span>
                {' '}
                (нові зміни:{' '}
                {page.updatesInOriginalRepo.map((commit, index) => (
                  <a
                    key={commit}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://github.com/mdn/content/commit/${
                      commit.split(' - ')[0]
                    }`}
                  >
                    {`${commit.slice(0, 7)}${
                      page.updatesInOriginalRepo.length - 1 > index ? ',' : ''
                    }`}{' '}
                  </a>
                ))}
                )
              </span>
            ) : null}
          </span>
          {page.hasContent && (
            <a
              className="underline px-2"
              title="Переглянути сирці перекладеної сторінки на GitHub"
              href={`https://github.com/webdoky/content/tree/master/files/uk${page.originalPath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={1.7} />
            </a>
          )}
        </div>
      </td>
      <td className="pt-2 pb-2">
        <div className="flex flex-row">
          <a
            className="underline px-2"
            title="Переглянути оригінальний текст на MDN"
            href={`https://developer.mozilla.org/en-us/docs/${page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobeIcon size={1.7} />
          </a>
          <a
            className="underline px-2"
            title="Переглянути сирці оригінальної сторінки на GitHub"
            href={`https://github.com/mdn/content/blob/main/files/en-us${page.originalPath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size={1.7} />
          </a>
        </div>
      </td>
      <td>
        {page.updatesInOriginalRepo.length ? (
          <CopyToClipboard
            text={listOfChanges}
            className={'px-2'}
            title={'Cкопіювати перелік комітів зі змінами'}
          >
            <CopyIcon size={1.7} />
          </CopyToClipboard>
        ) : null}

        {!page.hasContent && (
          <CopyToClipboard
            text={bashCommand}
            className={'px-2'}
            title={
              'Cкопіювати bash скрипт для ініціалізації файлу перекладу (скопіювати і виконати в корені репозиторію)'
            }
          >
            <TerminalIcon size={1.7} />
          </CopyToClipboard>
        )}
      </td>
    </tr>
  );
}
