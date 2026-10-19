/* Shared line icons. Stroke icons use currentColor so they follow the tone. */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function ArrowUpRight(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 17L17 7M8 7h9v9" {...stroke} />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" {...stroke} />
    </svg>
  );
}

export function ArrowUp(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" {...stroke} />
    </svg>
  );
}

/** The four-point star from the Zyraa emblem. */
export function Spark(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 1.5c.6 5.6 2.9 8.3 10.5 10.5-7.6 2.2-9.9 4.9-10.5 10.5-.6-5.6-2.9-8.3-10.5-10.5C9.1 9.8 11.4 7.1 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Phone(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M6.6 3h3l1.6 4.2-2 1.3a11 11 0 0 0 6.3 6.3l1.3-2L21 14.4v3a2.6 2.6 0 0 1-2.8 2.6A16.6 16.6 0 0 1 3.9 5.8 2.6 2.6 0 0 1 6.6 3Z"
        {...stroke}
      />
    </svg>
  );
}

export function Chat(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" {...stroke} />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" {...stroke} strokeWidth="2.2" />
    </svg>
  );
}

export function Pin(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 21s6.5-5.6 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.4 6.5 11 6.5 11Z" {...stroke} />
      <circle cx="12" cy="10" r="2.3" {...stroke} />
    </svg>
  );
}

export function Check(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" {...stroke} strokeWidth="2" />
    </svg>
  );
}

export function Cross(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6L6 18" {...stroke} strokeWidth="2" />
    </svg>
  );
}

export function Play(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" />
    </svg>
  );
}
