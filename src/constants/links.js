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
  name: 'Loadcurl',
  /** Browser tab / share title base — pages become "%s | Loadcurl Docs" */
  title: 'Loadcurl Docs',
  /** Full default title for the docs home / social fallback */
  titleDefault: 'Loadcurl Docs — HTTP Load Testing Guides',
  tagline:
    'Load test HTTP APIs from the dashboard — verify a host, paste curl, set RPS, read the report.',
  description:
    'Loadcurl documentation for creating, running, and monitoring HTTP load tests. Verify a host, compose a request or paste curl / Postman, follow live runs, then download a report. Usage is gated by request quota.',
  applicationName: 'Loadcurl Docs',
  footerTagline: 'Run load tests with confidence — no infra, no setup.',
  legalName: 'Loadcurl Pvt Ltd',
  url: 'https://docs.loadcurl.com',
  organizationName: 'loadcurl',
  projectName: 'loadcurl',
  /** Default Open Graph / Twitter card image (under static/) */
  ogImage: 'public/lightLogo.png',
  keywords:
    'Loadcurl, load testing, HTTP load test, API testing, curl, Postman, RPS, documentation',
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
  twitter: 'twitter',
  book: 'book',
};

/** Display labels for nav, footer, and buttons */
export const LINK_LABELS = {
  website: 'Website',
  dashboard: 'Dashboard',
  github: 'GitHub',
  docs: 'Documentation',
  intro: 'Intro',
  testing: 'Testing',
  workspace: 'Workspace',
  plan: 'Plan',
  faq: 'FAQ',
  discord: 'Discord',
  twitter: 'Twitter',
};

/** Docs section paths (first page of each sidebar category) */
export const DOCS = {
  intro: '/docs/tutorial/intro',
  testing: '/docs/tutorial/domains',
  workspace: '/docs/tutorial/organisation-management',
  plan: '/docs/tutorial/billing',
  faq: '/docs/tutorial/faq',
};

/** Navbar items — spread into themeConfig.navbar.items */
export const NAVBAR_ITEMS = [
  {
    to: DOCS.intro,
    label: LINK_LABELS.intro,
    position: 'left',
    activeBaseRegex: '/docs/tutorial/(intro|getting-started)/?$',
  },
  {
    to: DOCS.testing,
    label: LINK_LABELS.testing,
    position: 'left',
    activeBaseRegex: '/docs/tutorial/(domains|report-card|dashboard)/?$',
  },
  {
    to: DOCS.workspace,
    label: LINK_LABELS.workspace,
    position: 'left',
    activeBaseRegex: '/docs/tutorial/organisation-management/?$',
  },
  {
    to: DOCS.plan,
    label: LINK_LABELS.plan,
    position: 'left',
    activeBaseRegex: '/docs/tutorial/billing/?$',
  },
  {
    to: DOCS.faq,
    label: LINK_LABELS.faq,
    position: 'left',
    activeBaseRegex: '/docs/tutorial/faq/?$',
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
      {
        label: LINK_LABELS.twitter,
        href: LINKS.twitter,
        icon: LINK_ICONS.twitter,
      },
      // {
      //   label: LINK_LABELS.discord,
      //   href: LINKS.discord,
      //   icon: LINK_ICONS.discord,
      // },
    ],
  },
  {
    title: 'Legal',
    items: [
      {
        label: 'Terms',
        href: 'https://loadcurl.com/terms',
      },
      {
        label: 'Privacy',
        href: 'https://loadcurl.com/privacy',
      },
      {
        label: 'Cookies',
        href: 'https://loadcurl.com/cookies',
      },
    ],
  },
];
