import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import LinkIcon from '@site/src/components/LinkIcon';

export default function FooterLinkItem({item}) {
  const {to, href, label, icon, prependBaseUrlToHref, className, ...props} =
    item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const isExternal = Boolean(href) && !isInternalUrl(href);

  return (
    <Link
      className={clsx(
        'footer__link-item',
        icon && 'footer__link-item--with-icon',
        isExternal && 'footer__link-item--external',
        className,
      )}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
            ...(isExternal
              ? {target: '_blank', rel: 'noopener noreferrer'}
              : null),
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {icon && <LinkIcon name={icon} className="footer__link-icon" />}
      <span>{label}</span>
      {isExternal ? (
        <LinkIcon name="arrowUpRight" className="footer__link-external" />
      ) : null}
    </Link>
  );
}
