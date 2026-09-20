import clsx from 'clsx';
import styles from './styles.module.css';

const ICONS = {
  gauge: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M12 21a9 9 0 1 1 9-9"
      />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12l4.5-2.5"
      />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  zap: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"
      />
    </svg>
  ),
  terminal: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.75" />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7 9 3 3-3 3M13 15h4"
      />
    </svg>
  ),
  layers: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12 3 9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5"
      />
    </svg>
  ),
  shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3z"
      />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 12 2 2 4-4"
      />
    </svg>
  ),
  checklist: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M9 6h11M9 12h11M9 18h11"
      />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4 6 1.2 1.2L7.5 5M4 12l1.2 1.2L7.5 11M4 18l1.2 1.2L7.5 17"
      />
    </svg>
  ),
  share: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="6" cy="12" r="2.2" strokeWidth="1.75" />
      <circle cx="18" cy="6" r="2.2" strokeWidth="1.75" />
      <circle cx="18" cy="18" r="2.2" strokeWidth="1.75" />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        d="m8 11 8-4M8 13l8 4"
      />
    </svg>
  ),
  cloud: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.7 1.5A3.5 3.5 0 0 0 7 18z"
      />
    </svg>
  ),
  book: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      />
    </svg>
  ),
  users: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="9" cy="8" r="3" strokeWidth="1.75" />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M3.5 19a5.5 5.5 0 0 1 11 0"
      />
      <circle cx="17" cy="9" r="2.4" strokeWidth="1.75" />
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M15.5 19a4.5 4.5 0 0 1 5-4.2"
      />
    </svg>
  ),
  report: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.75"
        strokeLinecap="round"
        d="M7 17V9M12 17V6M17 17v-4"
      />
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.75" />
    </svg>
  ),
};

const THEMES = [
  {
    match: /p95|p99|latency|slo|percentile/i,
    icon: 'gauge',
    tone: 'teal',
  },
  {
    match: /rps|10,?000|throughput|ramp|quota|requests/i,
    icon: 'zap',
    tone: 'emerald',
  },
  {
    match: /curl|postman|graphql|http/i,
    icon: 'terminal',
    tone: 'slate',
  },
  {
    match: /auth|security|safe|domain|verify/i,
    icon: 'shield',
    tone: 'forest',
  },
  {
    match: /checklist|best practice|mistake|launch/i,
    icon: 'checklist',
    tone: 'lime',
  },
  {
    match: /graphql|bottleneck|identify/i,
    icon: 'share',
    tone: 'cyan',
  },
  {
    match: /cloud|local|staging|production/i,
    icon: 'cloud',
    tone: 'sky',
  },
  {
    match: /workspace|team|personal|organisation|organization/i,
    icon: 'users',
    tone: 'mint',
  },
  {
    match: /report|read|smoke|soak/i,
    icon: 'report',
    tone: 'olive',
  },
  {
    match: /vs|compare|k6|jmeter|locust/i,
    icon: 'layers',
    tone: 'deep',
  },
];

function resolveTheme({title = '', tags = [], permalink = ''}) {
  const haystack = [title, permalink, ...tags.map((t) => t.label || t)]
    .join(' ')
    .toLowerCase();

  for (const theme of THEMES) {
    if (theme.match.test(haystack)) {
      return theme;
    }
  }
  return {icon: 'book', tone: 'emerald'};
}

export function getBlogCoverTheme(meta) {
  return resolveTheme(meta);
}

export default function BlogCover({
  title,
  tags = [],
  permalink = '',
  className,
  size = 'md',
}) {
  const theme = resolveTheme({title, tags, permalink});
  const Icon = ICONS[theme.icon] || ICONS.book;

  return (
    <div
      className={clsx(
        styles.cover,
        styles[`tone_${theme.tone}`],
        styles[`size_${size}`],
        className,
      )}
      aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.glow} />
      <div className={styles.iconWrap}>
        <Icon className={styles.icon} />
      </div>
    </div>
  );
}
