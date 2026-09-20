import React from 'react';
import Content from '@theme-original/DocItem/Content';
import ReadingProgress from '@site/src/components/ReadingProgress';

export default function DocItemContent(props) {
  return (
    <>
      <ReadingProgress />
      <Content {...props} />
    </>
  );
}
