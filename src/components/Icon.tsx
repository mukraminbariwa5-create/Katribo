const PATHS = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bag: <><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  'arrow-left': <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  'arrow-up-right': <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
  close: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5Z" />,
  book: <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4V5.5Z" /><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6V5.5Z" /></>,
  image: <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m20.5 16-5-5-8 8.5" /></>,
  more: <><circle cx="5" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="19" cy="12" r="1.3" /></>,
  cup: <><path d="M6 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Z" /><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" /><path d="M9 3v2M12 3v2" /></>,
  bean: <><ellipse cx="12" cy="12" rx="6" ry="8.5" transform="rotate(35 12 12)" /><path d="M9 17c2-2 1-5 3-7s4-2 3.5-4" /></>,
  chair: <><path d="M7 11V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6" /><path d="M5 11h14v3H5z" /><path d="M7 14v6M17 14v6" /></>,
  wave: <><path d="M3 15c2 0 2-2 4.5-2s2.5 2 4.5 2 2-2 4.5-2 2.5 2 4.5 2" /><path d="M3 19c2 0 2-2 4.5-2s2.5 2 4.5 2 2-2 4.5-2 2.5 2 4.5 2" /><circle cx="16" cy="7" r="3" /></>,
  leaf: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19 13 11" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  phone: <path d="M6.5 4h3l1.5 4-2 1.2a10 10 0 0 0 5.8 5.8l1.2-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2Z" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  cash: <><rect x="2.5" y="6" width="19" height="12" rx="2.2" /><circle cx="12" cy="12" r="2.6" /><path d="M6.2 9.6h.01M17.8 14.4h.01" strokeWidth="2.6" /></>,
  wallet: <><path d="M17.5 7.5V5.8A1.8 1.8 0 0 0 15.7 4H6a2.5 2.5 0 0 0 0 5" /><path d="M3.5 6.5v11A2.5 2.5 0 0 0 6 20h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 19 9H6a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M16.5 14.5h.01" strokeWidth="2.8" /></>,
  card: <><rect x="2.5" y="5.5" width="19" height="13" rx="2.2" /><path d="M2.5 10h19" /><path d="M6.5 15h4" /></>,
  trash: <><path d="M4.5 7h15" /><path d="M9.5 7V5h5v2" /><path d="M6.5 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12" /></>,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5" /><path d="M12 8h.01" /></>,
  facebook: <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6.5H14V14h2.5l.5-3.5h-3V8.6c0-.3.3-.6.6-.6Z" />,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".6" /></>,
  tiktok: <><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 4c.4 2.5 2.2 4.2 5 4.5" /></>,
  play: <path d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.4-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5Z" fill="currentColor" stroke="none" />,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6 6 2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></>,
  'leaf-fill': <path d="M4.5 20.5c-.3-9 5-15.2 15.5-16.2.6 10.6-5.4 16-14 15.4l-.3.3-.6-.6 7.4-7.6-.7-.7-7.2 7.3c-.2.7-.1 1.4-.1 2.1Z" fill="currentColor" stroke="none" />,
  'cup-fill': <><path d="M5 9.5h12v4.5a5.5 5.5 0 0 1-5.5 5.5h-1A5.5 5.5 0 0 1 5 14V9.5Z" fill="currentColor" stroke="none" /><path d="M17 11h1.3a2.6 2.6 0 0 1 0 5.2H16.6" /><path d="M8 3.5l.6 2.6M11 2.8v3M14 3.5l-.6 2.6" /><path d="M4 21h14" /></>,
  'cloud-sun': <><circle cx="8.5" cy="8" r="3.4" fill="currentColor" stroke="none" /><path d="M8.5 1.8v1.4M3.2 4.1l1 1M2.3 9.5h1.4M13.8 4.1l-1 1" /><path d="M8.7 20.5a4.2 4.2 0 0 1-.4-8.4 5.6 5.6 0 0 1 10.7 1.6 3.4 3.4 0 0 1-.4 6.8H8.7Z" fill="currentColor" stroke="none" /></>,
  expand: <><path d="M15 4h5v5" /><path d="M9 20H4v-5" /><path d="m20 4-6 6" /><path d="m4 20 6-6" /></>,
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, className, stroke = 1.75 }: { name: IconName; size?: number; className?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      {PATHS[name]}
    </svg>
  );
}
