import React from 'react';
import {BlogPostProvider} from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme/BlogPostItem';
import {BlogListNumberContext} from './listNumberContext';

export {useBlogListNumber} from './listNumberContext';

export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
  startIndex = 0,
}) {
  return (
    <>
      {items.map(({content: BlogPostContent}, index) => (
        <BlogListNumberContext.Provider
          key={BlogPostContent.metadata.permalink}
          value={startIndex + index + 1}>
          <BlogPostProvider content={BlogPostContent}>
            <BlogPostItemComponent>
              <BlogPostContent />
            </BlogPostItemComponent>
          </BlogPostProvider>
        </BlogListNumberContext.Provider>
      ))}
    </>
  );
}
