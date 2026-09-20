import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

function findContentEl() {
  return (
    document.querySelector('.theme-doc-markdown') ||
    document.querySelector('.theme-blog-markdown') ||
    document.querySelector('article .markdown') ||
    document.querySelector('article')
  );
}

/**
 * In-flow progress bar placed after the site header (not fixed/absolute).
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let article = findContentEl();

    const update = () => {
      if (!article || !document.contains(article)) {
        article = findContentEl();
      }
      if (!article) {
        setProgress(0);
        return;
      }
      const rect = article.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const height = Math.max(article.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(
        Math.max(window.scrollY - absoluteTop + 64, 0),
        height,
      );
      setProgress((scrolled / height) * 100);
    };

    update();
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Reading progress">
      <div className={styles.fill} style={{width: `${progress}%`}} />
    </div>
  );
}
