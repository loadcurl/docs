/**
 * Central link constants for the loadcurl docs site.
 *
 * Usage:
 * - React / MDX: `import { LINKS } from '@site/src/constants/links'`
 * - Config: `import { LINKS, SITE, NAVBAR_ITEMS, FOOTER_LINKS } from './src/constants/links.js'`
 *
 * Update URLs here once; they apply across navbar, footer, pages, and docs.
 */

/** Site metadata (used in docusaurus.config.js) */
export const SITE = {
  name: 'loadcurl',
  tagline:
    'Load test your APIs in seconds — no infrastructure, no setup, just results.',
  footerTagline: 'Run load tests with confidence — no infra, no setup.',
  url: 'https://docs.loadcurl.com',
  organizationName: 'loadcurl',
  projectName: 'loadcurl',
};

/** External and internal URLs */
export const LINKS = {
  /** Main marketing / product site */
  website: 'https://loadcurl.com',
  /** App dashboard */
  dashboard: 'https://app.loadcurl.com',
  /** GitHub organization */
  github: 'https://github.com/loadcurl',
  /** Community */
  discord: 'https://discord.gg/loadcurl',
  /** Social */
  twitter: 'https://x.com/loadcurl',
  /** First docs page (internal) */
  docsIntro: '/docs/tutorial/intro',
};

/**
 * Icon keys for navbar/footer links (rendered by LinkIcon).
 * - world: main website
 * - dashboard: app dashboard
 * - github / discord: community
 * - book: docs pages
 */
export const LINK_ICONS = {
  world: 'world',
  dashboard: 'dashboard',
  github: 'github',
  discord: 'discord',
  book: 'book',
};

/** Display labels for nav, footer, and buttons */
export const LINK_LABELS = {
  website: 'Website',
  dashboard: 'Dashboard',
  github: 'GitHub',
  docs: 'Docs',
  intro: 'Introduction',
  discord: 'Discord',
};

/** Navbar items — spread into themeConfig.navbar.items */
export const NAVBAR_ITEMS = [
  {
    type: 'docSidebar',
    sidebarId: 'tutorialSidebar',
    position: 'left',
    label: LINK_LABELS.docs,
  },
  {
    href: LINKS.website,
    label: LINK_LABELS.website,
    icon: LINK_ICONS.world,
    position: 'right',
  },
  {
    href: LINKS.dashboard,
    label: LINK_LABELS.dashboard,
    icon: LINK_ICONS.dashboard,
    position: 'right',
  },
  {
    href: LINKS.github,
    label: LINK_LABELS.github,
    icon: LINK_ICONS.github,
    position: 'right',
  },
];

/** Footer link groups — spread into themeConfig.footer.links */
export const FOOTER_LINKS = [
  {
    title: 'Docs',
    items: [
      {
        label: LINK_LABELS.intro,
        to: LINKS.docsIntro,
        icon: LINK_ICONS.book,
      },
    ],
  },
  {
    title: 'Product',
    items: [
      {
        label: LINK_LABELS.website,
        href: LINKS.website,
        icon: LINK_ICONS.world,
      },
      {
        label: LINK_LABELS.dashboard,
        href: LINKS.dashboard,
        icon: LINK_ICONS.dashboard,
      },
    ],
  },
  {
    title: 'Community',
    items: [
      {
        label: LINK_LABELS.github,
        href: LINKS.github,
        icon: LINK_ICONS.github,
      },
      // {
      //   label: LINK_LABELS.discord,
      //   href: LINKS.discord,
      //   icon: LINK_ICONS.discord,
      // },
    ],
  },
];
