import React, {useMemo} from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogCover from '@site/src/components/BlogCover';
import {BLOG_POSTS} from '@site/src/data/blogIndex';
import styles from './styles.module.css';

function scoreRelated(currentTags, candidate) {
  if (!currentTags?.length || !candidate.tags?.length) {
    return 0;
  }
  const set = new Set(currentTags.map((t) => (t.label || t).toLowerCase()));
  return candidate.tags.reduce(
    (score, tag) => score + (set.has(String(tag).toLowerCase()) ? 1 : 0),
    0,
  );
}

export default function BlogRelatedPosts({limit = 3}) {
  const {metadata} = useBlogPost();
  const {permalink, tags} = metadata;

  const related = useMemo(() => {
    const scored = BLOG_POSTS.filter((post) => post.permalink !== permalink)
      .map((post) => ({post, score: scoreRelated(tags, post)}))
      .filter((entry) => entry.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          String(b.post.date).localeCompare(String(a.post.date)),
      )
      .slice(0, limit)
      .map((entry) => entry.post);

    // Fallback: newest posts if no tag overlap
    if (scored.length === 0) {
      return BLOG_POSTS.filter((post) => post.permalink !== permalink).slice(
        0,
        limit,
      );
    }
    return scored;
  }, [permalink, tags, limit]);

  if (!related.length) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="related-posts-heading">
      <div className={styles.header}>
        <h2 id="related-posts-heading" className={styles.heading}>
          Related posts
        </h2>
        <Link className={styles.browse} to="/blog">
          Browse all
        </Link>
      </div>
      <ul className={styles.grid}>
        {related.map((post) => (
          <li key={post.permalink} className={styles.item}>
            <Link
              to={post.permalink}
              className={styles.coverLink}
              aria-label={post.title}>
              <BlogCover
                title={post.title}
                tags={post.tags}
                permalink={post.permalink}
                size="md"
                className={styles.cover}
              />
            </Link>
            <div className={styles.body}>
              {post.tags?.length ? (
                <p className={styles.tagLine}>
                  {post.tags.slice(0, 2).join(' · ')}
                </p>
              ) : null}
              <h3 className={styles.title}>
                <Link to={post.permalink}>{post.title}</Link>
              </h3>
              {post.description ? (
                <p className={styles.excerpt}>{post.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
