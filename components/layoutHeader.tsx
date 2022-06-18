import Logo from './logo';
import Search from './search';
import ToggleDarkMode from './toggleDarkMode';
import { GithubIcon } from './icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export default function LayoutHeader({ searchData }) {
  const router = useRouter();
  const currentRoute = router.asPath;
  const nav: { path: string; title: string }[] = process.env
    .mainNav as unknown as {
    path: string;
    title: string;
  }[];
  const githubLink = process.env.ourGithub;

  return (
    <div className="py-2 border-t-2 border-ui-primary">
      <div className="container">
        <div className="flex items-center justify-between -mx-2 sm:-mx-4">
          <div className="flex flex-col items-center px-2 mr-auto sm:px-4 sm:flex-row">
            <Link href="/">
              <a className="flex items-center text-ui-primary" title="Home">
                <Logo width={40} className="text-ui-primary" />
                <span className="hidden ml-2 text-xl font-black tracking-tighter sm:block">
                  WebDoky
                </span>
              </a>
            </Link>

            <div className="hidden ml-2 mr-5 sm:flex items-center sm:ml-2">
              {nav.map(({ path, title }) => (
                <a
                  href={path}
                  key={path}
                  className={classNames(
                    'block p-1 font-medium nav-link text-ui-typo hover:text-ui-primary sm:ml-4 md:whitespace-nowrap',
                    { active: currentRoute.startsWith(path) }
                  )}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full px-2 sm:px-4 max-w-screen-xs">
            <Search searchData={searchData} />
          </div>

          <div className="flex items-center justify-end px-2 sm:px-4">
            <a
              href={githubLink}
              className="sm:ml-3"
              target="_blank"
              rel="noopener noreferrer"
              title="Ми на GitHub"
            >
              <GithubIcon size={1.7} />
            </a>

            <ToggleDarkMode className="ml-2 sm:ml-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
