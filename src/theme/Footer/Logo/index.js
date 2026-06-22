import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function LogoImage({logo}) {
  const src = useBaseUrl(logo.src);
  return (
    <img
      src={src}
      alt={logo.alt}
      className={clsx('footer__logo', logo.className)}
      width={logo.width}
      height={logo.height}
      style={logo.style}
    />
  );
}

export default function FooterLogo({logo}) {
  if (!logo) {
    return null;
  }

  return logo.href ? (
    <Link
      href={logo.href}
      className={styles.footerLogoLink}
      target={logo.target}
      rel="noopener noreferrer">
      <LogoImage logo={logo} />
    </Link>
  ) : (
    <LogoImage logo={logo} />
  );
}
