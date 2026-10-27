import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ImgHTMLAttributes, type ReactNode } from 'react';
import { Link } from '../lib/router';
import { cx } from '../lib/ui';
import { Icon } from './Icon';

/** Cursive accent text (Hugh is Life). Use "\n" for line breaks. */
export function Cursive({ text, className, as: Tag = 'span' }: { text: string; className?: string; as?: ElementType }) {
  return <Tag className={cx('script whitespace-pre-line', className)}>{text}</Tag>;
}

/** Image that fades in once decoded (no pop-in), with a dark placeholder surface. */
export function Img({ className, onLoad, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true); }, []);
  return (
    <img ref={ref} decoding="async" loading="lazy" {...props}
      className={cx('img-fade', loaded && 'is-loaded', className)}
      onLoad={(e) => { setLoaded(true); onLoad?.(e); }} />
  );
}

/** Fades/slides children in when they enter the viewport. */
export function Reveal({ children, delay = 0, as: Tag = 'div', className, style }:
  { children: ReactNode; delay?: number; as?: ElementType; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={cx('reveal', className)} style={{ ...style, ['--d' as string]: `${delay}ms` }}>{children}</Tag>;
}

type BtnVariant = 'primary' | 'outline' | 'ghost';
export function ButtonLink({ to, children, variant = 'primary', size, arrow, className }:
  { to: string; children: ReactNode; variant?: BtnVariant; size?: 'sm' | 'lg'; arrow?: boolean; className?: string }) {
  return (
    <Link to={to} className={cx('btn', `btn-${variant}`, size && `btn-${size}`, className)}>
      <span>{children}</span>{arrow && <Icon name="arrow" size={17} className="arrow" />}
    </Link>
  );
}

export function SectionHead({ title, sub, link, linkLabel = 'View All', id, className, accent }:
  { title: string; sub?: string; link?: string; linkLabel?: string; id?: string; className?: string; accent?: string }) {
  return (
    <Reveal className={cx('mb-6 flex items-end justify-between gap-4 md:mb-8', className)}>
      <div className="min-w-0">
        <h2 id={id} className="display flex flex-wrap items-baseline gap-x-4 text-[30px] sm:text-[40px] lg:text-[48px]">
          {title}
          {accent && <Cursive text={accent} className="-rotate-3 text-[44px] text-soft sm:text-[56px] lg:text-[68px]" />}
        </h2>
        {sub && <p className="mt-2 text-[15px] text-mute md:text-base">{sub}</p>}
      </div>
      {link && (
        <Link to={link} className="view-all mb-1 shrink-0"><span className="va-text">{linkLabel}</span><span className="va-icon"><Icon name="arrow" size={16} /></span></Link>
      )}
    </Reveal>
  );
}

export function Placeholder({ value, label }: { value: string | null; label: string }) {
  return value ? <>{value}</> : <span className="placeholder-tag" title="Placeholder — set it in src/data/site.ts">{label}</span>;
}

export function Stepper({ value, onChange, min = 1, max = 99, size = 'md', disabled, label = 'Quantity' }:
  { value: number; onChange: (n: number) => void; min?: number; max?: number; size?: 'sm' | 'md'; disabled?: boolean; label?: string }) {
  const sm = size === 'sm';
  const btn = cx('stepper-btn grid place-items-center rounded-full', sm ? 'h-8 w-8' : 'h-11 w-11 sm:h-12 sm:w-12');
  return (
    <div role="group" aria-label={label}
      className={cx('stepper inline-flex shrink-0 items-center rounded-full', sm ? 'h-10 gap-0.5 p-1' : 'h-[56px] gap-1 p-1.5 sm:h-[60px]', disabled && 'opacity-40')}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={disabled || value <= min} aria-label="Decrease quantity">
        <Icon name="minus" size={sm ? 14 : 18} stroke={2.4} />
      </button>
      <output aria-live="polite" className={cx('tabular text-center font-extrabold', sm ? 'min-w-7 text-[15px]' : 'min-w-9 text-[19px]')}>{value}</output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={disabled || value >= max} aria-label="Increase quantity">
        <Icon name="plus" size={sm ? 14 : 18} stroke={2.4} />
      </button>
    </div>
  );
}

export function PageHeader({ title, sub, accent, eyebrow, children }: { title: string; sub?: string; upper?: boolean; accent?: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <header className="shell pt-[96px] pb-6 md:pt-[128px] md:pb-8">
      {eyebrow && <p className="eyebrow mb-3 flex animate-rise items-center gap-3 md:mb-4"><span aria-hidden="true" className="h-px w-8 bg-crema/80" />{eyebrow}</p>}
      <h1 className="display flex animate-rise flex-wrap items-center gap-x-5 gap-y-1 text-[44px] sm:text-[60px] lg:text-[72px]">
        {title}
        {accent && <Cursive text={accent} className="-rotate-[6deg] text-[32px] leading-[1] text-soft sm:text-[42px] lg:text-[50px]" />}
      </h1>
      {sub && <p className="mt-3 animate-rise text-[15px] text-mute [animation-delay:80ms] md:text-[17px]">{sub}</p>}
      {children}
    </header>
  );
}
