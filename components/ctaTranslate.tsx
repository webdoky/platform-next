import classNames from 'classnames';
import styles from './editOnGithub.module.css';
import Link from 'next/link';

export default function CtaTranslate() {
  return (
    <div
      className={classNames(
        'mt-8 pt-5 pb-5 pl-5 pr-5 mb-8 rounded',
        styles.highlightBlock
      )}
    >
      <h3>Ви також можете допомогти нам з перекладом!</h3>
      <p>
        Розумієте англійську чи трохи знаєтесь на веб-технологіях? Можливо, ви
        можете допомогти нам зробити цю сторінку доступною українською мовою
        швидше!
      </p>
      <p>
        <Link href="/docs/#yak-doluchytysia" className="text-ui-typo">
          Як долучитися?
        </Link>
      </p>
    </div>
  );
}
