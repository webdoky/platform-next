import classNames from 'classnames';
import { ContentItem } from '../content/wdContentLoader';
import styles from './editOnGithub.module.css';

interface Params {
  currentPage: ContentItem;
}

const prepareNewIssueUrl = ({
  path,
  title,
}: {
  path: string;
  title: string;
}) => {
  const url = new URL('https://github.com/webdoky/content/issues/new');
  const bodySections = [
    `URL: ${process.env.BASE_PATH}${path}`,
    '#### Яка саме інформація є невірною, не корисною, чи неповною?\n',
    '#### Конкретний розділ чи заголовок?\n',
    '#### Як вона має виглядати натомість?\n',
    '#### Якісь конкретні дії, які допоможуть нам відтворити цю проблему?\n',
  ];
  const params = {
    body: bodySections.join('\n\n'),
    labels: ['needs-triage', 'content'].join(','),
    title: `Проблема зі сторінкою ${title}: <короткий опис проблеми тут>`,
  };

  Object.entries(params).map(([param, value]) =>
    url.searchParams.set(param, value)
  );

  return url.toString();
};

export default function EditOnGithub({ currentPage }: Params) {
  const { path, title, originalPath } = currentPage;

  const newIssueUrl = prepareNewIssueUrl({ path, title });
  const sourceUrl = `https://github.com/webdoky/content/tree/master/files/uk${originalPath}`;

  return (
    <div
      id="on-github"
      className={classNames(
        'mt-8 pt-5 pb-5 pl-5 pr-5 mb-8 rounded',
        styles.highlightBlock
      )}
    >
      <h3>Помітили помилку на цій сторінці?</h3>
      <p>
        <a
          className="text-ui-typo"
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Переглянути сирці на GitHub
        </a>
        .
      </p>
      <p>
        <a
          className="text-ui-typo"
          href={`https://github.com/webdoky/content/edit/master/files/uk${originalPath}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Редагувати вміст на GitHub
        </a>
        .
      </p>
      <p className="mb-0">
        <a
          className="text-ui-typo"
          href={newIssueUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Почати обговорення на GitHub стосовно вмісту цієї сторінки
        </a>
        .
      </p>
    </div>
  );
}
