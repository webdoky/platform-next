import Layout from '../components/layout';
import Logo from '../components/logo';
import MetaHead from '../components/metaHead';
import { prepareSearchData } from '../components/search';
import WdChangelogLoader from '../content/wdChangelogLoader';
import WdContentLoader from '../content/wdContentLoader';

export async function getStaticProps() {
  const pages = await WdContentLoader.getAll();
  const changelogs = await WdChangelogLoader.getAll();

  const changeLogContent = changelogs[0].content || '';

  return {
    props: {
      searchData: prepareSearchData(pages),
      changelogs: changeLogContent,
      targetLocale: process.env.TARGET_LOCALE,
      basePath: process.env.BASE_PATH,
    },
  };
}

export default function IndexPage({
  searchData,
  changelogs,
  targetLocale,
  basePath,
}) {
  return (
    <main className="wd-main-page">
      <MetaHead
        title="Про веб, у вебі, для вебу | ВебДоки"
        description="Проєкт Webdoky — це зібрання інформації про технології відкритого вебу. HTML, CSS, JavaScript, та API, як для вебсайтів, так і для прогресивних вебзастосунків"
        canonicalUrl={`${basePath}/`}
        basePath={`${basePath}`}
      />
      <Layout
        currentPage={{ path: '/' }}
        searchData={searchData}
        sidebarSections={[]}
      >
        <div className="pt-8 md:pt-16">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-2 text-ui-primary">
              <Logo width={80} />
              <h2 className="text-3xl text-6xl font-black tracking-tighter border-none">
                WebDoky
              </h2>
            </div>
            <h1 className="text-4xl text-center lg:text-5xl">
              Ресурси та документація. <br />
              Від розробників — для розробників
            </h1>
            <div className="flex justify-space-between p-2">
              <a
                className="p-2 mx-5 border-b border-ui-border"
                href={`/${targetLocale}/docs/Web/JavaScript/`}
              >
                JavaScript &#8594;
              </a>
              <a
                className="p-2 mx-5 border-b border-ui-border"
                href={`/${targetLocale}/docs/Web/CSS/`}
              >
                CSS &#8594;
              </a>
              <a
                className="p-2 mx-5 border-b border-ui-border"
                href={`/${targetLocale}/docs/Web/HTML/`}
              >
                HTML &#8594;
              </a>
            </div>
          </div>

          <div className="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

          <div className="section-info flex flex-wrap justify-center -mx-4">
            <div className="flex flex-col w-full px-4 mb-8 md:w-2/3">
              <h3 className="font-bold tracking-wide uppercase mb-0 text-ui-primary">
                Що нового
              </h3>
              <p className="mb-0">
                Найсвіжіші оновлення з нашого{' '}
                <a
                  href="https://github.com/webdoky/content/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  репозиторію
                </a>
              </p>
              <div className="border-ui-border w-1/4 border-b mb-5 mt-1"></div>

              <div
                key="index"
                className="changelog"
                dangerouslySetInnerHTML={{ __html: changelogs }}
              ></div>

              <div className="border-ui-border w-1/4 border-b mb-3 mt-4"></div>
              <a
                href="https://github.com/webdoky/content/blob/master/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Вся історія версій
              </a>
            </div>

            <div className="flex flex-col w-full px-4 mb-8 md:w-1/3">
              <p className="text-lg text-left">
                WebDoky (ВебДоки) — це проект, покликаний зробит вміст MDN Web
                Docs доступним українською мовою.
              </p>
              <h3 className="font-bold tracking-wide uppercase text-ui-primary">
                Долучитись
              </h3>
              <p className="text-lg text-left">
                WebDoky — це відкритий проєкт, і будь-хто може долучитися і
                допомогти нам робити вебдокументацію доступною для україномовних
                читачів.{' '}
                <a href="/docs/">
                  Докладніше — в розділі &quot;Про проєкт&quot;
                </a>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}
