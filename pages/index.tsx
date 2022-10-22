import Link from 'next/link';
import Layout from '../components/layout';
import Logo from '../components/logo';
import MetaHead from '../components/metaHead';
import WdChangelogLoader from '../content/wdChangelogLoader';

export async function getStaticProps() {
  const changelogs = await WdChangelogLoader.getAll();

  const changeLogContent = changelogs[0].content || '';

  return {
    props: {
      changelogs: changeLogContent,
      targetLocale: process.env.TARGET_LOCALE,
      basePath: process.env.BASE_PATH,
    },
  };
}

export default function IndexPage({ changelogs, targetLocale, basePath }) {
  return (
    <main className="wd-main-page">
      <MetaHead
        title="Про веб, у вебі, для вебу | ВебДоки"
        description="Проєкт Webdoky — це зібрання інформації про технології відкритого вебу. HTML, CSS, JavaScript, та API, як для вебсайтів, так і для прогресивних вебзастосунків"
        canonicalUrl={`${basePath}/`}
        basePath={`${basePath}`}
      />
      <Layout currentPage={{ path: '/' }} sidebarSections={[]}>
        <div className="pt-8 md:pt-16">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-2 text-ui-primary">
              <Logo width={80} />
              <p className="text-3xl text-6xl font-black tracking-tighter border-none">
                WebDoky
              </p>
            </div>
            <h1 className="text-4xl text-center lg:text-5xl">
              Ресурси та документація. <br />
              Від розробників — для розробників
            </h1>
            <div className="flex p-2 flex-wrap justify-center">
              <Link href={`/${targetLocale}/docs/Web/JavaScript/`}>
                <a className="p-2 mx-5 border-b border-ui-border no-underline text-ui-typo">
                  JavaScript &#8594;
                </a>
              </Link>
              <Link href={`/${targetLocale}/docs/Web/CSS/`}>
                <a className="p-2 mx-5 border-b border-ui-border no-underline text-ui-typo">
                  CSS &#8594;
                </a>
              </Link>
              <Link href={`/${targetLocale}/docs/Web/HTML/`}>
                <a className="p-2 mx-5 border-b border-ui-border no-underline text-ui-typo">
                  HTML &#8594;
                </a>
              </Link>
            </div>
          </div>

          <div className="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

          <div className="section-info flex flex-wrap justify-center -mx-4">
            <div className="flex flex-col w-full px-4 mb-8 md:w-2/3">
              <h2 className="font-bold tracking-wide uppercase mb-0">
                Що нового
              </h2>
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
              <h2 className="sr-only">Про нас</h2>
              <p className="text-lg text-left">
                WebDoky (ВебДоки) — це проект, покликаний зробити вміст MDN Web
                Docs доступним українською мовою.
              </p>
              <h3 className="font-bold tracking-wide uppercase">Долучитись</h3>
              <p className="text-lg text-left">
                WebDoky — це відкритий проєкт, і будь-хто може долучитися і
                допомогти нам робити вебдокументацію доступною для україномовних
                читачів.{' '}
                <Link href="/docs/">
                  Докладніше — в розділі &quot;Про проєкт&quot;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}
