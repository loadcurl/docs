import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogFilterBar from '@site/src/components/BlogFilterBar';
import BlogFeaturedPost from '@site/src/components/BlogFeaturedPost';
import LinkIcon from '@site/src/components/LinkIcon';
import styles from './styles.module.css';

function BlogListPageMetadata({metadata}) {
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListHero({title, description}) {
  const logo = useBaseUrl('/public/darkLogo.png');

  return (
    <header className={styles.hero}>
      <div className={styles.heroBrand}>
        <img className={styles.heroLogo} src={logo} alt="" width={56} height={56} />
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>Guides & notes</p>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroDescription}>{description}</p>
        </div>
      </div>
      <div className={styles.heroActions}>
        <Link
          className={clsx('button button--primary', styles.heroCta)}
          href="https://app.loadcurl.com/auth/register">
          Start free
        </Link>
        <Link className={styles.heroSecondary} to="/docs/tutorial/intro">
          <LinkIcon name="book" className={styles.heroSecondaryIcon} />
          Read docs
        </Link>
      </div>
    </header>
  );
}

function BlogListPageContent({metadata, items, sidebar}) {
  const page = metadata.page ?? 1;
  const postsPerPage = metadata.postsPerPage ?? items.length;
  const isFirstPage = page === 1;
  const featured = isFirstPage && items.length > 0 ? items[0] : null;
  const listItems = featured ? items.slice(1) : items;
  // Featured is #1; remaining cards continue from #2 on page 1
  const startIndex = featured ? 1 : (page - 1) * postsPerPage;

  return (
    <BlogLayout sidebar={sidebar}>
      <BlogListHero
        title={metadata.blogTitle}
        description={metadata.blogDescription}
      />
      <BlogFilterBar />
      {featured ? <BlogFeaturedPost item={featured} /> : null}
      <div className={styles.feed}>
        <BlogPostItems items={listItems} startIndex={startIndex} />
      </div>
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
