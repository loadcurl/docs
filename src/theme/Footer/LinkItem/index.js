import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import LinkIcon from '@site/src/components/LinkIcon';

export default function FooterLinkItem({item}) {
  const {to, href, label, icon, prependBaseUrlToHref, className, ...props} =
    item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const showExternalIcon = href && !isInternalUrl(href) && !icon;

  return (
    <Link
      className={clsx(
        'footer__link-item',
        icon && 'footer__link-item--with-icon',
        className,
      )}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {icon && <LinkIcon name={icon} className="footer__link-icon" />}
      <span>{label}</span>
      {showExternalIcon && <IconExternalLink />}
    </Link>
  );
}
