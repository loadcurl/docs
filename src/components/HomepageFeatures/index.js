import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureIcons = {
  zap: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      />
    </svg>
  ),
  chart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" d="M4 19V5" />
      <path strokeWidth="2" strokeLinecap="round" d="M4 19h16" />
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 17V11M12 17V7M16 17v-4"
      />
    </svg>
  ),
  integrate: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
      />
      <path
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      />
    </svg>
  ),
};

const FeatureList = [
  {
    title: 'Simple by Design',
    icon: 'zap',
    featured: true,
    description:
      'From a verified host to a running load test — paste curl or fill the form on New test, set target RPS, and go.',
  },
  {
    title: 'Focus on Performance',
    icon: 'chart',
    description:
      'Configure, run, and analyze HTTP workloads — domains, first test, reports, Plan, Usage, and company workspaces.',
  },
  {
    title: 'Built for the dashboard',
    icon: 'integrate',
    description:
      'Guides for New test, live run polling, PDF reports, Account, and upgrading a personal workspace to a company.',
  },
];

function Feature({title, icon, description, featured}) {
  const Icon = FeatureIcons[icon];
  return (
    <article
      className={clsx(styles.featureCard, featured && styles.featureCardFeatured)}>
      {Icon ? (
        <div
          className={clsx(
            styles.featureIcon,
            featured && styles.featureIconFeatured,
          )}
          aria-hidden="true">
          <Icon className={styles.featureIconSvg} />
        </div>
      ) : null}
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </article>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <p className={styles.sectionLabel}>Why loadcurl</p>
        <Heading as="h2" className={styles.sectionTitle}>
          Everything you need to load test with confidence
        </Heading>
        <div className={styles.featureGrid}>
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
