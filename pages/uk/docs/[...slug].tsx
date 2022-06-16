import Head from 'next/head';
import { prepareSearchData } from '../../../components/search';
import WdLayout from '../../../components/wdLayout';
import WdContentLoader, { ContentItem } from '../../../content/wdContentLoader';
import { XIcon, MenuIcon } from '../../../components/icons';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import WdNav from '../../../components/wdNav';
import WdOnThisPage from '../../../components/wdOnThisPage';
import EditOnGithub from '../../../components/editOnGithub';
import LayoutFooter from '../../../components/layoutFooter';

const targetLocale = process.env.TARGET_LOCALE;
const mdnUrlPrefix = 'https://developer.mozilla.org/en-US/docs/';

export async function getStaticPaths() {
  const pages = await WdContentLoader.getAll(['slug']);

  return {
    paths: pages.map((post) => {
      return {
        params: {
          slug: post.slug.split('/'),
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const page = await WdContentLoader.getBySlug(slug.join('/'));
  const pages = await WdContentLoader.getAll(['path', 'title', 'hasContent']);
  const translatedPages = pages.filter((page) => page.hasContent);

  return {
    props: {
      page: page || null,
      searchData: prepareSearchData(translatedPages),
      basePath: process.env.BASE_PATH,
    },
  };
}

export default function DocEntry({
  page,
  searchData,
  basePath,
}: {
  page: ContentItem | null;
  searchData: unknown;
  basePath: string;
}) {
  const {
    title,
    description,
    content,
    hasContent,
    macros,
    slug,
    headings,
    originalPath,
  } = page;
  const robots = hasContent ? 'all' : 'noindex,nofollow';
  const hasSidebar = !!macros.length;

  const [headerHeight, setHeaderHeight] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const mainContentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setHeaderHeight(mainContentRef.current.offsetTop);
    };
    const handleRouteChange = () => {
      setSidebarOpen(false);
      document.body.classList.toggle('overflow-hidden', false);
    };

    window.addEventListener('resize', handleResize);
    router.events.on('routeChangeStart', handleRouteChange);

    // initial header height
    setHeaderHeight(mainContentRef.current.offsetTop);

    return () => {
      window.removeEventListener('resize', handleResize);
      router.events.off('routeChangeStart', handleRouteChange);
      document.body.classList.toggle('overflow-hidden', false);
    };
  }, [router.events]);

  const sidebarTogglerHandler = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.classList.toggle('overflow-hidden', !sidebarOpen);
  };

  const sidebarStyle = {
    top: `${headerHeight}px`,
    height: `calc(100vh - ${headerHeight}px)`,
  };

  return (
    <main className="wd-doc-page">
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
        <meta property="robots" name="robots" content={robots} />
        <link rel="canonical" href={`${basePath}/`} />
        <style global jsx>{`
          // TODO:  ???
        `}</style>
      </Head>

      <WdLayout searchData={searchData}>
        <main
          ref={mainContentRef}
          className="
        container
        relative
        flex flex-wrap
        justify-start
        flex-1
        w-full
        bg-ui-background
      "
        >
          {hasSidebar && (
            <aside
              className={classNames(
                'sidebar border-t max-h-full border-ui-border lg:border-t-0 lg:max-h-auto',
                { open: sidebarOpen }
              )}
              style={sidebarStyle}
            >
              <div className="w-full pb-16 bg-ui-background">
                <WdNav
                  sidebar={macros}
                  currentPage={page}
                  // @navigate="sidebarOpen = false" // TODO:
                />
              </div>
            </aside>
          )}

          <div
            className={classNames('w-full pb-4', {
              'pl-0 lg:pl-12 lg:w-3/4': hasSidebar,
            })}
          >
            <div className="flex flex-wrap items-start justify-start">
              {hasContent && (
                <div
                  className="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky"
                  style={{ top: '4rem' }}
                >
                  <WdOnThisPage headings={headings} page={page} />
                </div>
              )}

              <div className="order-1 w-full md:w-2/3">
                <div className="wd-content">
                  <h1>{title}</h1>
                  {hasContent ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <div>
                      <p>
                        Схоже, що ми іще не переклали цей розділ. Скористайтеся
                        цим посиланням, щоб перейти на оригінальну версію цієї
                        статті в MDN.
                      </p>
                      <a
                        href={`${mdnUrlPrefix}${slug}`}
                        target="_blank"
                        rel=" noopener noreferrer"
                      >
                        {title}
                      </a>
                    </div>
                  )}
                </div>

                {hasContent && <EditOnGithub currentPage={page} />}
              </div>
            </div>
          </div>

          {hasSidebar && (
            <div className="fixed bottom-0 right-0 z-50 p-8 lg:hidden">
              <button
                className="p-3 text-white rounded-full shadow-lg bg-ui-primary hover:text-white"
                onClick={sidebarTogglerHandler}
              >
                {sidebarOpen && <XIcon size={1.5} />}
                {!sidebarOpen && <MenuIcon size={1.5} />}
              </button>
            </div>
          )}
        </main>

        <footer className="border-t border-ui-border">
          <LayoutFooter
            originalLink={`${mdnUrlPrefix}${slug}`}
            originalTitle={title}
            originalPath={originalPath}
          />
        </footer>
      </WdLayout>
    </main>
  );
}
