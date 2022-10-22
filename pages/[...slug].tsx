import { ContentItem } from '../content/wdContentLoader';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import InternalContentLoader from '../content/internalContentLoader';
import { SidebarSection } from '../components/sidebar';
import NextPrevLinks from '../components/nextPrevLinks';
import WdOnThisPage from '../components/wdOnThisPage';
import MetaHead from '../components/metaHead';
import { normalizeUrl } from '../utils/url';

const sidebarSections = [
  {
    title: 'Про проєкт',
    items: [
      {
        title: 'Кілька слів про нас',
        path: '/docs',
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

export async function getStaticPaths() {
  const elements = await InternalContentLoader.getAll();

  const paths = elements.map(({ path }) => ({
    params: {
      slug: path.split('/').filter((entry, index) => !(index === 0 && !entry)), // filter out first empty string element, which would turn into slash during reverse operation
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const page = await InternalContentLoader.getbySlug(slug.join('/'));
  const internalPages = await InternalContentLoader.getAll(['path', 'title']);

  return {
    props: {
      page,
      allPages: internalPages,
      basePath: process.env.BASE_PATH,
      sidebarSections,
    },
  };
}

export default function InnerDocEntry({
  page,
  allPages,
  basePath,
  sidebarSections,
}: {
  page: ContentItem | null;
  allPages: Partial<ContentItem>[];
  basePath: string;
  sidebarSections: SidebarSection[];
}) {
  const { title, description, content, slug, headings } = page;

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
      <MetaHead
        title={`${title} — Про нас | ВебДоки`}
        description={description}
        canonicalUrl={normalizeUrl(`${basePath}/${slug}`)}
        basePath={`${basePath}`}
      />

      <Layout
        currentPage={page}
        sidebarSections={sidebarSections}
        hasSidebar={!!sidebarSections}
      >
        <div className="flex flex-wrap items-start justify-start">
          <div className="order-1 w-full md:w-2/3">
            <div
              className="wd-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
              <NextPrevLinks page={page} pages={allPages} />
            </div>
          </div>

          <div
            className="order-2 w-full md:w-1/3 sm:pl-4 md:pl-6 lg:pl-8 sticky"
            style={{ top: '4rem' }}
          >
            <WdOnThisPage headings={headings} page={page} />
          </div>
        </div>
      </Layout>
    </main>
  );
}
