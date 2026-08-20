import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import {LINKS} from '@site/src/constants/links';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const STATS = [
  {value: '6', label: 'Guides', trend: 'Tests, dashboard, workspaces'},
  {value: 'Dashboard', label: 'First test', trend: 'No CLI required'},
  {value: 'Company', label: 'Upgrade', trend: 'Personal → team'},
  {value: 'Free', label: 'To start', trend: 'No credit card'},
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroCard}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Documentation</span>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.heroActions}>
              <Link
                className={clsx('button button--lg', styles.ctaPrimary)}
                to={LINKS.docsIntro}>
                Get started →
              </Link>
              <Link
                className={clsx('button button--lg button--secondary', styles.ctaSecondary)}
                href={LINKS.dashboard}>
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
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statTrend}>{stat.trend}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="loadcurl documentation">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
