import React from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import {usePluralForm} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import BlogCover from '@site/src/components/BlogCover';
import ReadingProgress from '@site/src/components/ReadingProgress';
import BlogRelatedPosts from '@site/src/components/BlogRelatedPosts';
import LinkIcon from '@site/src/components/LinkIcon';
import {useBlogListNumber} from '../BlogPostItems/listNumberContext';
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

function ListCardMeta() {
  const {metadata} = useBlogPost();
  const {date, readingTime, authors} = metadata;
  const author = authors[0];
  const readingTimePlural = useReadingTimePlural();
  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className={styles.cardMeta}>
      {author?.imageURL ? (
        <img
          className={styles.cardAvatar}
          src={author.imageURL}
          alt=""
          width={22}
          height={22}
        />
      ) : null}
      <span className={styles.cardAuthor}>{author?.name || 'Loadcurl'}</span>
      <span className={styles.dot} aria-hidden="true">
        ·
      </span>
      <time dateTime={date}>{dateTimeFormat.format(new Date(date))}</time>
      {typeof readingTime !== 'undefined' && (
        <>
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>
          <span>{readingTimePlural(readingTime)}</span>
        </>
      )}
    </div>
  );
}

function ListCardTags({tags}) {
  if (!tags?.length) {
    return null;
  }

  const visible = tags.slice(0, 3);

  return (
    <ul className={styles.cardTags}>
      {visible.map((tag) => (
        <li key={tag.permalink}>
          <Link className={styles.cardTag} to={tag.permalink}>
            {tag.label}
          </Link>
        </li>
      ))}
      {tags.length > visible.length ? (
        <li className={styles.cardTagMore}>+{tags.length - visible.length}</li>
      ) : null}
    </ul>
  );
}

function ListCard({children}) {
  const {metadata} = useBlogPost();
  const {permalink, title, tags, description} = metadata;
  const listNumber = useBlogListNumber();

  return (
    <article className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          {listNumber != null ? (
            <span className={styles.cardNumber} aria-label={`Post ${listNumber}`}>
              #{listNumber}
            </span>
          ) : null}
          <ListCardTags tags={tags} />
        </div>
        <h2 className={styles.cardTitle}>
          <Link to={permalink}>{title}</Link>
        </h2>
        {description ? (
          <p className={styles.cardExcerpt}>{description}</p>
        ) : (
          <div className={styles.cardExcerptMd}>
            <BlogPostItemContent>{children}</BlogPostItemContent>
          </div>
        )}
        <ListCardMeta />
      </div>
      <Link
        to={permalink}
        className={styles.cardCoverLink}
        aria-label={title}>
        <BlogCover
          title={title}
          tags={tags}
          permalink={permalink}
          size="md"
          className={styles.cardCover}
        />
      </Link>
    </article>
  );
}

function PostPage({children, className}) {
  const {metadata} = useBlogPost();
  const {title, tags, permalink} = metadata;

  return (
    <BlogPostItemContainer className={className}>
      <ReadingProgress />
      <Link className={styles.backLink} to="/blog">
        <LinkIcon name="arrowLeft" className={styles.backIcon} />
        Back to blog
      </Link>
      <div className={styles.postHero}>
        <BlogCover
          title={title}
          tags={tags}
          permalink={permalink}
          size="lg"
          className={styles.postHeroCover}
        />
      </div>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
      <BlogRelatedPosts />
    </BlogPostItemContainer>
  );
}

export default function BlogPostItem({children, className}) {
  const {isBlogPostPage} = useBlogPost();

  if (!isBlogPostPage) {
    return <ListCard>{children}</ListCard>;
  }

  return <PostPage className={className}>{children}</PostPage>;
}
