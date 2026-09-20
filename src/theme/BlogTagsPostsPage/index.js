import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useBlogTagsPostsPageTitle} from '@docusaurus/theme-common/internal';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import Unlisted from '@theme/ContentVisibility/Unlisted';
import BlogFilterBar from '@site/src/components/BlogFilterBar';
import styles from './styles.module.css';

function BlogTagsPostsPageMetadata({tag}) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} description={tag.description} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function BlogTagsPostsPageContent({tag, items, sidebar, listMetadata}) {
  const title = useBlogTagsPostsPageTitle(tag);
  const page = listMetadata.page ?? 1;
  const postsPerPage = listMetadata.postsPerPage ?? items.length;
  const startIndex = (page - 1) * postsPerPage;

  return (
    <BlogLayout sidebar={sidebar}>
      {tag.unlisted && <Unlisted />}
      <header className={styles.header}>
        <p className={styles.eyebrow}>Filtered topic</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>
          {translate(
            {
              id: 'theme.blog.tagPage.postCount',
              message: '{count} articles tagged with "{label}"',
              description: 'Summary under a blog tag filter heading',
            },
            {count: tag.count, label: tag.label},
          )}
        </p>
        {tag.description ? (
          <p className={styles.description}>{tag.description}</p>
        ) : null}
      </header>
      <BlogFilterBar />
      <div className={styles.feed}>
        <BlogPostItems items={items} startIndex={startIndex} />
      </div>
      <BlogListPaginator metadata={listMetadata} />
    </BlogLayout>
  );
}

export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
