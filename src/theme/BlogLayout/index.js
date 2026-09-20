import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';

export default function BlogLayout(props) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const hasToc = Boolean(toc);

  return (
    <Layout {...layoutProps}>
      <div
        className={clsx('blog-shell', {
          'blog-shell--with-aside': hasSidebar,
          'blog-shell--with-toc': hasToc,
        })}>
        {hasSidebar ? (
          <div className="blog-aside-col">
            <BlogSidebar sidebar={sidebar} />
          </div>
        ) : null}
        <main
          className="blog-main"
          itemScope
          itemType="https://schema.org/Blog">
          <div className="blog-main__inner">{children}</div>
        </main>
        {hasToc ? (
          <div className="blog-toc-col">
            <div className="blog-toc">{toc}</div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
