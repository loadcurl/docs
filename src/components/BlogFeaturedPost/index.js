import React from 'react';
import Link from '@docusaurus/Link';
import {BlogPostProvider, useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import {usePluralForm} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import BlogCover from '@site/src/components/BlogCover';
import LinkIcon from '@site/src/components/LinkIcon';
import styles from './styles.module.css';

function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}

function FeaturedInner() {
  const {metadata} = useBlogPost();
  const {permalink, title, tags, description, date, readingTime, authors} =
    metadata;
  const author = authors[0];
  const readingTimePlural = useReadingTimePlural();
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const visibleTags = tags?.slice(0, 3) ?? [];

  return (
    <article className={styles.featured}>
      <Link
        to={permalink}
        className={styles.coverLink}
        aria-label={title}>
        <BlogCover
          title={title}
          tags={tags}
          permalink={permalink}
          size="lg"
          className={styles.cover}
        />
      </Link>
      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.badge}>Featured</span>
          {visibleTags.length > 0 ? (
            <ul className={styles.tags}>
              {visibleTags.map((tag) => (
                <li key={tag.permalink}>
                  <Link className={styles.tag} to={tag.permalink}>
                    {tag.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <h2 className={styles.title}>
          <Link to={permalink}>{title}</Link>
        </h2>
        {description ? <p className={styles.excerpt}>{description}</p> : null}
        <div className={styles.meta}>
          {author?.imageURL ? (
            <img
              className={styles.avatar}
              src={author.imageURL}
              alt=""
              width={22}
              height={22}
            />
          ) : null}
          <span className={styles.author}>{author?.name || 'Loadcurl'}</span>
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>
          <time dateTime={date}>{dateTimeFormat.format(new Date(date))}</time>
          {typeof readingTime !== 'undefined' ? (
            <>
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
              <span>{readingTimePlural(readingTime)}</span>
            </>
          ) : null}
        </div>
        <Link className={styles.readMore} to={permalink}>
          Read article
          <LinkIcon name="arrowRight" className={styles.readMoreIcon} />
        </Link>
      </div>
    </article>
  );
}

export default function BlogFeaturedPost({item}) {
  if (!item?.content) {
    return null;
  }
  const BlogPostContent = item.content;
  return (
    <BlogPostProvider content={BlogPostContent}>
      <FeaturedInner />
    </BlogPostProvider>
  );
}
