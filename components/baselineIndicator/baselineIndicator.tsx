import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import type { BaselineItem } from '../../content/wdContentLoader';

import { ChevronDownIcon } from '../icons';

import classes from './baselineIndicator.module.scss';

const ENGINES = [
  { name: 'Blink', browsers: ['Chrome', 'Edge'] },
  { name: 'Gecko', browsers: ['Firefox'] },
  { name: 'WebKit', browsers: ['Safari'] },
];
const SURVEY_URL =
  'https://survey.alchemer.com/s3/7634825/MDN-baseline-feedback';
const BCD_LINK = `#sumisnist-iz-brauzeramy`;

export default function BaselineIndicator({
  status,
}: {
  status?: BaselineItem;
}) {
  const { pathname } = useRouter();

  const low_date = useMemo(
    () =>
      status?.baseline_low_date
        ? new Date(status.baseline_low_date)
        : undefined,
    [status?.baseline_low_date]
  );
  const level = status?.baseline
    ? status.baseline
    : status?.baseline === false
    ? 'not'
    : undefined;

  const feedbackLink = `${SURVEY_URL}?page=${encodeURIComponent(
    pathname
  )}&level=${level}`;

  const supported = useCallback(
    (browser: string) => {
      if (!status) {
        return false;
      }
      const version: string | undefined =
        status.support?.[browser.toLowerCase()];
      return Boolean(status.baseline || version);
    },
    [status]
  );

  const engineTitle = useCallback(
    (browsers: string[]) =>
      browsers
        .map((browser, index, array) => {
          const previous = index > 0 ? supported(array[index - 1]) : undefined;
          const current = supported(browser);
          return typeof previous === 'undefined'
            ? current
              ? `Підтримується в ${browser}`
              : `Не має широкої підтримки в ${browser}`
            : current === previous
            ? ` і ${browser}`
            : current
            ? `, а також підтримується в ${browser}`
            : `, але не має широкої підтримки в ${browser}`;
        })
        .join(''),
    [supported]
  );
  //   const [isExpanded, setIsExpanded] = useState(false);
  //   const toggleIsExpanded = useCallback(
  //     () => setIsExpanded((oldValue) => !oldValue),
  //     []
  //   );
  if (!status) return null;

  return level ? (
    <details
      className={classNames(classes.baselineIndicator, classes[level])}
      //   onToggle={toggleIsExpanded}
    >
      <summary>
        <span
          className={classes.indicator}
          role="img"
          aria-label={level !== 'not' ? 'Є База' : 'Нема Бази'}
        />
        <h2>
          {level !== 'not' ? (
            <>
              База{' '}
              <span className={classes.notBold}>
                {level === 'high'
                  ? 'Широка доступність'
                  : low_date?.getFullYear()}
              </span>
            </>
          ) : (
            <span className={classes.notBold}>Обмежена доступність</span>
          )}
        </h2>
        {level === 'low' && (
          <div className={classes.pill}>Доступне віднедавна</div>
        )}
        <div className={classes.browsers}>
          {ENGINES.map(({ name, browsers }) => (
            <span
              key={name}
              className={classes.engine}
              title={engineTitle(browsers)}
            >
              {browsers.map((browser) => (
                <span
                  key={browser}
                  className={classNames(
                    classes.browser,
                    classes[browser.toLowerCase()],
                    { [classes.supported]: supported(browser) }
                  )}
                  role="img"
                  aria-label={`${browser} – ${
                    supported(browser) ? 'є' : 'нема'
                  }`}
                />
              ))}
            </span>
          ))}
        </div>
        <ChevronDownIcon className={classes.iconChevron} />
      </summary>
      <div className={classes.extra}>
        {level === 'high' && low_date ? (
          <p>
            Ця можливість є добре вкоріненою та працює на багатьох пристроях та
            версіях браузерів. Вона доступна у браузерах від:{' '}
            {low_date.toLocaleDateString('uk-UA', {
              year: 'numeric',
              month: 'long',
            })}
            .
          </p>
        ) : level === 'low' && low_date ? (
          <p>
            Ця можливість працює в найновіших пристроях і версіях браузерів від:{' '}
            {low_date.toLocaleDateString('uk-UA', {
              year: 'numeric',
              month: 'long',
            })}
            . Вона може не працювати в старих пристроях або браузерах.
          </p>
        ) : (
          <p>
            Ця можливість не належить до Бази, оскільки вона не працює в частині
            найбільш поширених браузерів.
          </p>
        )}
        <ul>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/blog/baseline-evolution-on-mdn/"
              target="_blank"
              className={classes.learnMore}
              rel="noreferrer"
            >
              Довідатись більше
            </a>
          </li>
          <li>
            <a href={BCD_LINK}>Див. подробиці доступності</a>
          </li>
          <li>
            <a
              href={feedbackLink}
              className={classes.feedbackLink}
              target="_blank"
              rel="noreferrer"
            >
              Дати зворотній зв&apos;язок
            </a>
          </li>
        </ul>
      </div>
    </details>
  ) : null;
}
