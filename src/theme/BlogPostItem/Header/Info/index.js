import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {usePluralForm} from '@docusaurus/theme-common';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import LinkIcon from '@site/src/components/LinkIcon';
import styles from './styles.module.css';

function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}

function MetaPill({icon, children}) {
  return (
    <span className={styles.pill}>
      <LinkIcon name={icon} className={styles.pillIcon} />
      <span>{children}</span>
    </span>
  );
}

export default function BlogPostItemHeaderInfo({className}) {
  const {metadata} = useBlogPost();
  const {date, readingTime} = metadata;
  const readingTimePlural = useReadingTimePlural();

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const formattedDate = dateTimeFormat.format(new Date(date));

  return (
    <div className={clsx(styles.container, className)}>
      <MetaPill icon="calendar">
        <time dateTime={date}>{formattedDate}</time>
      </MetaPill>
      {typeof readingTime !== 'undefined' && (
        <MetaPill icon="clock">{readingTimePlural(readingTime)}</MetaPill>
      )}
    </div>
  );
}
