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
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      />
    </svg>
  ),
};

const FeatureList = [
  {
    title: 'Simple by Design',
    icon: 'zap',
    description: (
      <>
        Stop wrestling with complex tooling. loadcurl gets you from endpoint
        URL to a full load test in under 60 seconds — paste your URL, set your
        concurrency, and go. Built for developers who want answers fast.
      </>
    ),
  },
  {
    title: 'Focus on Performance, Not Setup',
    icon: 'chart',
    description: (
      <>
        Everything you need to configure, run, and analyze HTTP workloads is
        documented here. From your first test to CI/CD pipelines and team
        workflows — the docs cover it all, step by step.
      </>
    ),
  },
  {
    title: 'Built to Integrate',
    icon: 'integrate',
    description: (
      <>
        loadcurl fits right into your existing stack. Explore clear API
        references, real-world examples, and integration guides for GitHub
        Actions, GitLab CI, and more — all in one searchable, fast-loading
        site.
      </>
    ),
  },
];

function Feature({title, icon, description}) {
  const Icon = FeatureIcons[icon];
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        {Icon ? (
          <div className={styles.featureIcon} aria-hidden="true">
            <Icon className={styles.featureIconSvg} />
          </div>
        ) : null}
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
