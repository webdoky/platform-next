import Link from 'next/link';
import Layout from '../components/layout';
import MetaHead from '../components/metaHead';

export async function getStaticProps() {
  return {
    props: {
      basePath: process.env.BASE_PATH,
    },
  };
}

export default function NotFoundPage({ basePath }) {
  return (
    <main className="wd-main-page">
      <MetaHead
        title="Нічого не знайдено | ВебДоки"
        description="Проєкт Webdoky — це зібрання інформації про технології відкритого вебу. HTML, CSS, JavaScript, та API, як для вебсайтів, так і для прогресивних вебзастосунків"
        basePath={`${basePath}`}
      />
      <Layout currentPage={{ path: '/404.html' }} sidebarSections={[]}>
        <div className="pt-8 md:pt-16">
          <h1 className="text-center font-bold text-4xl text-ui-typo">
            От халепа, тут ніц нема!
          </h1>
        </div>
        <div className="mb-10 flex items-center justify-center">
          <Link href="/" className="font-bold text-xl">
            Повернутись на головну
          </Link>
          .
        </div>
      </Layout>
    </main>
  );
}
