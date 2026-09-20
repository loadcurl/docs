import React, {memo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {useLocation} from '@docusaurus/router';
import {useVisibleBlogSidebarItems} from '@docusaurus/plugin-content-blog/client';
import BlogCover from '@site/src/components/BlogCover';
import LinkIcon from '@site/src/components/LinkIcon';
import styles from './styles.module.css';

function isBlogPostPath(pathname) {
  return (
    pathname.startsWith('/blog/') &&
    !pathname.startsWith('/blog/tags') &&
    !pathname.startsWith('/blog/authors') &&
    !pathname.startsWith('/blog/archive') &&
    !/^\/blog\/page\//.test(pathname)
  );
}

function SidebarItem({item, active, index}) {
  return (
    <li className={styles.item}>
      <Link
        to={item.permalink}
        className={clsx(styles.link, active && styles.linkActive)}>
        <span className={styles.itemIndex} aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
        <BlogCover
          title={item.title}
          permalink={item.permalink}
          size="sm"
          className={styles.itemCover}
        />
        <span className={styles.itemTitle}>{item.title}</span>
      </Link>
    </li>
  );
}

function BlogSidebarDesktop({sidebar}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const {pathname} = useLocation();
  const onPostPage = isBlogPostPath(pathname);

  const filtered = items.filter((item) => {
    return (
      item.permalink !== pathname && `${item.permalink}/` !== pathname
    );
  });

  const visible = onPostPage ? filtered.slice(0, 5) : filtered;

  return (
    <aside className={styles.aside}>
      <nav
        className={clsx(styles.sidebar, onPostPage && styles.sidebarCompact)}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog recent posts navigation',
          description: 'The ARIA label for recent posts in the blog sidebar',
        })}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              {onPostPage ? 'Keep reading' : 'Latest'}
            </p>
            <p className={styles.title}>{sidebar.title}</p>
          </div>
          {onPostPage ? (
            <Link className={styles.backMini} to="/blog" title="Back to blog">
              <LinkIcon name="arrowLeft" className={styles.backMiniIcon} />
            </Link>
          ) : null}
        </div>

        {visible.length === 0 ? (
          <p className={styles.empty}>No other posts yet.</p>
        ) : (
          <ul className={clsx(styles.list, 'clean-list')}>
            {visible.map((item, index) => {
              const active =
                pathname === item.permalink ||
                pathname === `${item.permalink}/`;
              return (
                <SidebarItem
                  key={item.permalink}
                  item={item}
                  active={active}
                  index={index + 1}
                />
              );
            })}
          </ul>
        )}

        <Link className={styles.viewAll} to="/blog">
          View all posts
          <LinkIcon name="arrowUpRight" className={styles.viewAllIcon} />
        </Link>
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
