import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {LINKS, SITE} from '@site/src/constants/links';
import styles from './styles.module.css';

export default function FooterLayout({style, links, logo, copyright}) {
  const {siteConfig} = useDocusaurusContext();

  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
        <div className={styles.footerInner}>
          <div className={styles.brandRow}>
            <div className={styles.brandIdentity}>
              {logo ? (
                <div className={styles.brandLogo}>{logo}</div>
              ) : (
                <span className={styles.brandName}>{siteConfig.title}</span>
              )}
              <div className={styles.brandCopy}>
                {!logo ? null : (
                  <span className={styles.brandName}>{siteConfig.title}</span>
                )}
                <p className={styles.brandTagline}>
                  {SITE.footerTagline ?? siteConfig.tagline}
                </p>
              </div>
            </div>

            <div className={styles.brandActions}>
              <Link className={styles.brandCta} to={LINKS.docsIntro}>
                Get started
              </Link>
              <Link
                className={styles.brandCtaGhost}
                href={LINKS.dashboard}
                target="_blank"
                rel="noopener noreferrer">
                Open dashboard
              </Link>
            </div>
          </div>

          {links ? (
            <div className={styles.linksShell}>
              <div className={styles.linksShellGlow} aria-hidden="true" />
              {links}
            </div>
          ) : null}
        </div>

        {copyright ? (
          <div className={clsx('footer__bottom', styles.footerBottom)}>
            {copyright}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
