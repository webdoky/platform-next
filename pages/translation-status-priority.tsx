import Layout from '../components/layout';
import WdChangelogLoader from '../content/wdChangelogLoader';
import WdContentLoader from '../content/wdContentLoader';
import PopularitiesLoader from '../content/wdPopularitiesLoader';
import { pick } from 'lodash';
import TranslationStatus from '../components/translationStatus';
import Link from 'next/link';
import MetaHead from '../components/metaHead';

export async function getStaticProps() {
  const pages = await WdContentLoader.getAll();
  const changelogs = await WdChangelogLoader.getAll();
  const allPopularities = PopularitiesLoader.getAll();

  const changeLogContent = changelogs[0].content || '';

  return {
    props: {
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
          'translationLastUpdatedAt',
        ])
      ),
      allPopularities,
    },
  };
}

export default function IndexPage({
  basePath,
  allPopularities,
  pages: allPages,
}) {
  return (
    <main className="wd-main-page">
      <MetaHead
        title="Стан перекладу пріоритетних сторінок | ВебДоки"
        description="Тут наведена порівняльна таблиця стану перекладу документації
        за розділами, у розрізі їхньої популярності."
        canonicalUrl={`${basePath}/translation-status-priority`}
        basePath={`${basePath}`}
      />
      <Layout
        currentPage={{ path: '/translation-status-priority' }}
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
                <Link href="/translation-status-general/">
                  Перейти на огляд сторінок загалом
                </Link>
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
                priorityOnly
              />
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}
