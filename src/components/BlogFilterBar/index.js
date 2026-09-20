import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {BLOG_FILTERS, BLOG_TOTAL_POSTS} from '@site/src/data/blogFilters';
import styles from './styles.module.css';

function normalizePath(path) {
  if (!path) {
    return '/blog';
  }
  const clean = path.replace(/\/$/, '') || '/blog';
  // Ignore pagination suffixes like /blog/page/2
  if (/^\/blog\/page\/\d+$/.test(clean)) {
    return '/blog';
  }
  return clean;
}

export default function BlogFilterBar({className}) {
  const {pathname} = useLocation();
  const current = normalizePath(pathname);
  const isAll = current === '/blog';

  return (
    <div className={clsx(styles.bar, className)}>
      <div className={styles.header}>
        <p className={styles.label}>Browse by topic</p>
        <Link className={styles.allTags} to="/blog/tags">
          All tags
        </Link>
      </div>
      <div className={styles.scroller} role="navigation" aria-label="Blog topic filters">
        <Link
          className={clsx(styles.chip, isAll && styles.chipActive)}
          to="/blog"
          aria-current={isAll ? 'page' : undefined}>
          <span className={styles.chipLabel}>All</span>
          <span className={styles.chipCount}>{BLOG_TOTAL_POSTS}</span>
        </Link>
        {BLOG_FILTERS.map((filter) => {
          const active = current === normalizePath(filter.permalink);
          return (
            <Link
              key={filter.permalink}
              className={clsx(styles.chip, active && styles.chipActive)}
              to={filter.permalink}
              aria-current={active ? 'page' : undefined}>
              <span className={styles.chipLabel}>{filter.label}</span>
              <span className={styles.chipCount}>{filter.count}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
