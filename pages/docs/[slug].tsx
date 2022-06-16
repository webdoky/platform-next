import Head from 'next/head';
import { ContentItem } from '../../content/wdContentLoader';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import InternalContentLoader from '../../content/indetrnalContentLoader';
import WdContentLoader from '../../content/wdContentLoader';
import { prepareSearchData } from '../../components/search';
import { SidebarSection } from '../../components/sidebar';
import NextPrevLinks from '../../components/nextPrevLinks';
import WdOnThisPage from '../../components/wdOnThisPage';

export async function getStaticPaths() {
  const elements = await InternalContentLoader.getAll();

  const paths = elements.map(({ slug }) => ({
    params: {
      slug: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const page = await InternalContentLoader.getbySlug(slug);
  const pages = await WdContentLoader.getAll(['path', 'title', 'hasContent']);
  const internalPages = await InternalContentLoader.getAll(['path', 'title']);
  const translatedPages = pages.filter((page) => page.hasContent);

  const sidebarSections = [
    {
      title: 'Про проєкт',
      items: [
        {
          title: 'Пара слів про нас',
          path: '/docs/index',
        },
        {
          title: 'Як відбувається переклад',
          path: '/docs/translation',
        },
        {
          title: 'Як перекладати в середовищі GitHub',
          path: '/docs/translating-in-github',
        },
        {
          title: 'Прийняті патерни іменування в репозиторіях',
          path: '/docs/git-naming-conventions',
        },
        { title: 'Глосарій', path: '/docs/glossary' },
        { title: 'Ліцензії на вміст WebDoky', path: '/docs/licensing' },
      ],
    },
  ];

  return {
    props: {
      page,
      allPages: internalPages,
      searchData: prepareSearchData(translatedPages),
      basePath: process.env.BASE_PATH,
      sidebarSections,
    },
  };
}

export default function InnerDocEntry({
  page,
  allPages,
  searchData,
  basePath,
  sidebarSections,
}: {
  page: ContentItem | null;
  allPages: Partial<ContentItem>[];
  searchData: unknown;
  basePath: string;
  sidebarSections: SidebarSection[];
}) {
  const { title, description, content, path, headings } = page;

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
    <main className="wd-doc-page" ref={mainContentRef}>
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
        <link rel="canonical" href={`${basePath}/${path}`} />
      </Head>

      <Layout
        searchData={searchData}
        currentPage={page}
        sidebarSections={sidebarSections}
        hasSidebar={!!sidebarSections}
      >
        <div className="flex flex-wrap items-start justify-start">
          <div
            className="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky"
            style={{ top: '4rem' }}
          >
            <WdOnThisPage headings={headings} page={page} />
          </div>

          <div className="order-1 w-full md:w-2/3">
            <div
              className="wd-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
              <NextPrevLinks page={page} pages={allPages} />
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}
