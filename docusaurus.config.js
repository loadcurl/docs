// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import {FOOTER_LINKS, LINKS, NAVBAR_ITEMS, SITE} from './src/constants/links.js';


// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: SITE.title,
  tagline: SITE.tagline,
  favicon: 'public/darkLogo.png',
  titleDelimiter: '|',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: SITE.url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: SITE.organizationName,
  projectName: SITE.projectName,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Extra head tags for social previews (OG / Twitter). Per-page title &
  // description still come from Layout / markdown front matter.
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        property: 'og:site_name',
        content: SITE.name,
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'application-name',
        content: SITE.applicationName,
      },
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Loadcurl Blog',
          blogDescription:
            'API load testing guides — RPS, latency percentiles, curl workflows, and cloud load testing.',
          postsPerPage: 6,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 8,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'Loadcurl Blog',
            description:
              'Practical guides on API load testing from the Loadcurl team.',
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/blog/tags/**', '/tags/**', '/search'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: SITE.ogImage,
      metadata: [
        {name: 'description', content: SITE.description},
        {name: 'keywords', content: SITE.keywords},
        {name: 'twitter:card', content: 'summary_large_image'},
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // Built-in DocSearch (default Docusaurus Algolia search bar)
      algolia: {
        appId: '2RV1OQ8291',
        // Search-only key — safe to commit
        apiKey: 'ff2fbed27c3bdc4eab77dd49e7457604',
        indexName: 'docs_loadcurl_com_2rv1oq8291_pages',
        contextualSearch: true,
        searchPagePath: 'search',
      },
      navbar: {
        title: SITE.name,
        logo: {
          alt: `${SITE.name} logo`,
          src: 'public/darkLogo.png',
          srcDark: 'public/lightLogo.png',
        },
        items: NAVBAR_ITEMS,
      },
      footer: {
        style: 'dark',
        // Product, Community, and Legal columns — docs live in the sidebar.
        links: FOOTER_LINKS,
        logo: {
          alt: `${SITE.name} logo`,
          src: 'public/lightLogo.png',
          href: LINKS.website,
        },
        copyright: `Copyright © ${new Date().getFullYear()} ${SITE.legalName}. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
