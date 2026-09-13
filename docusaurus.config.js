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
  title: SITE.name,
  tagline: SITE.tagline,
  favicon: 'public/darkLogo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: SITE.url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'public/lightLogo.png',
      colorMode: {
        respectPrefersColorScheme: true,
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
