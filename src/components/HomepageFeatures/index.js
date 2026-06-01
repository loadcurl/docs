import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    description: (
      <>
        loadcurl helps you run and manage HTTP workloads with a simple,
        developer-friendly workflow.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    description: (
      <>
        Browse the docs to learn how to configure, deploy, and operate loadcurl
        in your environment.
      </>
    ),
  },
  {
    title: 'Powered by React',
    description: (
      <>
        Integrate loadcurl with your stack using clear APIs and practical
        examples in this documentation site.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
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
