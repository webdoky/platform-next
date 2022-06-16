import Head from 'next/head';
import Layout from '../components/layout';
import { prepareSearchData } from '../components/search';
import WdChangelogLoader from '../content/wdChangelogLoader';
import WdContentLoader from '../content/wdContentLoader';
import PopularitiesLoader from '../content/wdPopularitiesLoader';
import { pick } from 'lodash';
import TranslationStatus from '../components/translationStatus';

export async function getStaticProps() {
  const pages = await WdContentLoader.getAll();
  const changelogs = await WdChangelogLoader.getAll();
  const allPopularities = PopularitiesLoader.getAll();

  const changeLogContent = changelogs[0].content || '';

  return {
    props: {
      searchData: prepareSearchData(pages),
      changelogs: changeLogContent,
      targetLocale: process.env.TARGET_LOCALE,
      basePath: process.env.BASE_PATH,
      pages: pages.map((entry) =>
        pick(entry, [
          'title',
          'slug',
          'path',
          'section',
          'originalPath',
          'updatesInOriginalRepo',
          'hasContent',
          'sourceLastUpdatetAt',
          'translationLastUpdatedAt',
        ])
      ),
      allPopularities,
    },
  };
}

export default function IndexPage({
  searchData,
  basePath,
  allPopularities,
  pages: allPages,
}) {
  const title = 'Вебдоки — про веб, у вебі, для вебу — Webdoky';
  const description =
    'Проєкт Webdoky — це зібрання інформації про технології відкритого вебу. HTML, CSS, JavaScript, та API, як для вебсайтів, так і для прогресивних вебзастосунків';

  return (
    <main className="wd-main-page">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" name="og:title" content={title} />
        <meta property="twitter:title" name="twitter:title" content={title} />
        <meta
          property="og:description"
          name="og:description"
          content={description}
        />
        <meta
          property="twitter:description"
          name="twitter:description"
          content={description}
        />
        <link rel="canonical" href={`${basePath}/`} />
      </Head>
      <Layout
        currentPage={{ path: '/translation-status-priority' }}
        searchData={searchData}
        sidebarSections={[]}
      >
        <div className="flex flex-wrap items-start justify-start">
          <div className="order-1 w-full md:w-2/3">
            <div className="wd-content">
              <h1 id="пара-слів-про-нас">
                <a href="#Стан-перекладу-документації" aria-hidden="true">
                  <span className="icon icon-link"></span>
                </a>
                Статус перекладу пріоритетних сторінок
              </h1>
              <p>
                <a href="/translation-status-general">
                  Перейти на огляд сторінок загалом
                </a>
              </p>
              <h2 id="як-зявився-цей-проєкт">
                <a href="#Огляд" aria-hidden="true">
                  <span className="icon icon-link"></span>
                </a>
                Огляд
              </h2>
              <p>
                Популярність різних сторінок береться з аналітики MDN, де ця
                інформація застосовується для ранжування пошуку (докладніше про
                це{' '}
                <a href="https://github.com/mdn/yari/blob/main/docs/popularities.md">
                  тут
                </a>
                ). Ми її використовуємо як орієнтир для вибору сторінок, які
                слід перекласти в першу чергу.
              </p>
              <p>
                Індекс популярності вже нормалізований, і коливається між 0 та
                1. Більший рейтинг означає вищий пріоритет перекладу.
              </p>
              <p>
                Наразі тут показані сторінки з популярністю
                <strong> понад 1%</strong>
              </p>

              <TranslationStatus
                allPopularities={allPopularities}
                allPages={allPages}
              />
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}
