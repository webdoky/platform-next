import Link from 'next/link';
import { GlobeIcon } from './icons';

interface Params {
  originalLink?: string;
  originalTitle?: string;
  originalPath?: string;
}

export default function LayoutFooter({
  originalLink,
  originalPath,
  originalTitle,
}: Params) {
  return (
    <div className="py-2 border-b-2 border-t-1 border-ui-primary bg-ui-footer">
      <div className="container">
        <div className="flex lg:items-center items-end justify-between -mx-2 sm:-mx-4 flex-col sm:flex-row">
          {(!originalLink || !originalPath) && (
            <div className="px-2 mr-auto sm:px-4">
              <p className="mb-0.5 text-sm">
                За авторством{' '}
                <a
                  href="https://github.com/webdoky/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ui-typo"
                >
                  спільноти WebDoky
                </a>
                , доступно за ліцензією{' '}
                <a
                  href="https://creativecommons.org/licenses/by-sa/2.5/"
                  target="_blank"
                  rel="license noopener noreferrer"
                  className="text-ui-typo"
                >
                  CC-BY-SA 2.5
                </a>{' '}
                (
                <Link href="/docs/licensing/" className="text-ui-typo">
                  докладніше тут
                </Link>
                ).
              </p>
            </div>
          )}

          {originalLink && originalPath && (
            <div className="px-2 mr-auto sm:px-4">
              <p className="lg:mb-1 mb-2 text-sm">
                За авторством спільноти Mozilla (
                <span
                  className="underline"
                  style={{ textDecorationStyle: 'dotted' }}
                  title="jswisher, SphinxKnight, rana.dadu.77, mfuji09, cogpark, darby, AlemFarid, Grae-Drake, chrisdavidmills, Mirinth, envisioncodes, 9999472, wbamberg, Sheppy, asmforce, jwhitlock, Jenna59, CrazyChick63, rbg3434, fitojb, Slawek37, leandroruel, LimeClover, serv-inc, dvincent, adminisrator, groovecoder, teoli, lewiscartman, microsoft, Sanantananda, wakka27, fscholz, moh.sugiarta, Jeremie, onei, eddyng23, cherrylover85, altigere, davidsuisse1, cdac, BenB, ethertank, Gerv"
                >
                  авторів первинної Вікі
                </span>
                , і{' '}
                <a
                  href={`https://github.com/mdn/content/commits/main/files/en-us${originalPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ui-typo"
                >
                  пізніших учасників
                </a>
                ).
              </p>
              <p className="mb-0.5 text-sm">
                Перекладено й адаптовано{' '}
                <a
                  href="https://github.com/webdoky/"
                  target="_blank"
                  className="text-ui-typo"
                  rel="noopener noreferrer"
                >
                  спільнотою WebDoky
                </a>
                , доступно за ліцензією{' '}
                <a
                  href="https://creativecommons.org/licenses/by-sa/2.5/"
                  target="_blank"
                  className="text-ui-typo"
                  rel="license noopener noreferrer"
                >
                  CC-BY-SA 2.5
                </a>{' '}
                (
                <Link href="/docs/licensing/" className="text-ui-typo">
                  докладніше тут
                </Link>
                ).
              </p>
            </div>
          )}

          {originalLink && (
            <div className="flex items-center justify-end px-2 sm:px-4">
              <a
                href={originalLink}
                className="ml-3 flex items-center text-sm whitespace-nowrap text-ui-typo"
                target="_blank"
                rel="noopener noreferrer"
                title={`MDN: "${originalTitle}"`}
              >
                <span>Оригінал статті</span>
                <GlobeIcon size={1.7} className="m-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
