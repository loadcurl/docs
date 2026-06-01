import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {isRegexpStringMatch} from '@docusaurus/theme-common';
import IconExternalLink from '@theme/Icon/ExternalLink';
import LinkIcon from '@site/src/components/LinkIcon';

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  icon,
  isDropdownLink,
  prependBaseUrlToHref,
  className,
  ...props
}) {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});
  const isExternalLink = label && href && !isInternalUrl(href);
  const showExternalIcon = isExternalLink && !icon;

  const linkContentProps = html
    ? {dangerouslySetInnerHTML: {__html: html}}
    : {
        children: (
          <>
            {icon && <LinkIcon name={icon} className="navbar__link-icon" />}
            <span>{label}</span>
            {showExternalIcon && (
              <IconExternalLink
                {...(isDropdownLink && {width: 12, height: 12})}
              />
            )}
          </>
        ),
      };

  const linkClassName = clsx(
    className,
    icon && 'navbar__link--with-icon',
  );

  if (href) {
    return (
      <Link
        href={prependBaseUrlToHref ? normalizedHref : href}
        className={linkClassName}
        {...props}
        {...linkContentProps}
      />
    );
  }

  return (
    <Link
      to={toUrl}
      isNavLink
      className={linkClassName}
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  );
}
