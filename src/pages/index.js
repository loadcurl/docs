import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import LinkIcon from '@site/src/components/LinkIcon';
import {LINKS, SITE} from '@site/src/constants/links';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const StatIcons = {
  book: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      />
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      />
    </svg>
  ),
  play: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 5.5v13l13-6.5L5 5.5z"
      />
    </svg>
  ),
  users: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      />
      <circle cx="9" cy="7" r="4" strokeWidth="2" />
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
      />
    </svg>
  ),
  spark: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v4M12 17v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M3 12h4M17 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
      />
    </svg>
  ),
};

const STATS = [
  {
    title: 'Guides',
    detail: 'Tests, domains, and plan',
    to: LINKS.docsIntro,
    icon: 'book',
  },
  {
    title: 'New test',
    detail: 'Verify a host, paste curl',
    to: '/docs/tutorial/getting-started',
    icon: 'play',
  },
  {
    title: 'Company',
    detail: 'Personal → team',
    to: '/docs/tutorial/organisation-management',
    icon: 'users',
  },
  {
    title: 'Free',
    detail: 'No credit card',
    to: '/docs/tutorial/billing',
    icon: 'spark',
  },
];

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroCard}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Documentation</span>
            <Heading as="h1" className={styles.heroTitle}>
              {SITE.name}
            </Heading>
            <p className={styles.heroSubtitle}>{SITE.tagline}</p>
            <div className={styles.heroActions}>
              <Link
                className={clsx('button button--lg', styles.ctaPrimary)}
                to={LINKS.docsIntro}>
                Get started
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                className={clsx(
                  'button button--lg button--secondary',
                  styles.ctaSecondary,
                )}
                href={LINKS.dashboard}
                target="_blank"
                rel="noopener noreferrer">
                <LinkIcon name="dashboard" className={styles.ctaIcon} />
                Open dashboard
              </Link>
            </div>
          </div>
          <div className={styles.heroAccent} aria-hidden="true">
            <div className={styles.heroAccentIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                />
              </svg>
            </div>
            <p className={styles.heroAccentLabel}>Run load tests</p>
            <p className={styles.heroAccentValue}>with confidence</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {STATS.map((stat) => {
            const Icon = StatIcons[stat.icon];
            return (
              <Link key={stat.title} className={styles.statCard} to={stat.to}>
                <div className={styles.statTop}>
                  <span className={styles.statIcon} aria-hidden="true">
                    <Icon className={styles.statIconSvg} />
                  </span>
                  <span className={styles.statArrow} aria-hidden="true">
                    →
                  </span>
                </div>
                <p className={styles.statTitle}>{stat.title}</p>
                <p className={styles.statDetail}>{stat.detail}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="HTTP Load Testing Guides"
      description={SITE.description}
      image={SITE.ogImage}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
