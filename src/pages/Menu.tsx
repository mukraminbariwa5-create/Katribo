import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '../components/Icon';
import { PageHeader, Reveal } from '../components/Primitives';
import { VisitBanner } from '../components/VisitBanner';
import { ProductCard } from '../components/ProductCard';
import { FILTERS, PRODUCTS, inFilter, type Filter, type Product } from '../data/menu';
import { useSearchParams } from '../lib/router';
import { cx, useTitle } from '../lib/ui';

/**
 * Category selector (Menu + Gallery): the buttons sit in one dark track and a white "thumb"
 * slides to the selected one. Phones: the track swipes sideways (faded right edge).
 */
export function FilterBar({ value, onChange, options, label, counts }:
  { value: string; onChange: (v: string) => void; options: readonly string[]; label: string; counts?: Record<string, number> }) {
  const track = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    const place = () => {
      const el = track.current?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (el) setThumb({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
    };
    place();
    const ro = new ResizeObserver(place);
    if (track.current) ro.observe(track.current);
    document.fonts?.ready.then(place);
    const t = setTimeout(() => setAnimate(true), 60); // no slide on first paint
    return () => { ro.disconnect(); clearTimeout(t); };
  }, [value, options]);

  useEffect(() => {
    track.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [value]);

  return (
    <div className="filter-fade no-scrollbar -mx-[clamp(20px,6vw,120px)] overflow-x-auto px-[clamp(20px,6vw,120px)] py-1 xl:mx-0 xl:overflow-visible xl:px-0">
      <div ref={track} role="tablist" aria-label={label}
        className={cx('filter-track relative flex w-max gap-1 xl:max-w-full xl:flex-wrap', thumb && 'has-thumb')}
        onKeyDown={(e) => {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          const i = options.indexOf(value);
          const next = options[(i + (e.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length];
          onChange(next);
          requestAnimationFrame(() => track.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus());
        }}>
        {thumb && (
          <span aria-hidden="true" className={cx('filter-thumb', animate && 'is-animated')}
            style={{ width: thumb.w, height: thumb.h, transform: `translate3d(${thumb.x}px, ${thumb.y}px, 0)` }} />
        )}
        {options.map((o) => (
          <button key={o} type="button" role="tab" aria-selected={o === value} tabIndex={o === value ? 0 : -1}
            className="pill" onClick={() => onChange(o)}>
            {o}
            {counts?.[o] != null && <span className="pill-count" aria-label={`${counts[o]} items`}>{counts[o]}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/** "View All" link/button content: label with a drawn underline + round arrow. */
export function ViewAllInner({ label = 'View All' }: { label?: string }) {
  return <><span className="va-text">{label}</span><span className="va-icon"><Icon name="arrow" size={16} /></span></>;
}

/** One-line descriptions under each category heading. */
const BLURBS: Record<string, string> = {
  Coffee: 'Espresso classics, hot or iced.',
  Milkshake: 'Thick, creamy, and made for warm days.',
  Latte: 'Smooth espresso and milk, every flavour.',
  Macchiato: 'Bold espresso layered over milk.',
  Specialty: 'Our signature creations.',
  Pastries: 'Something sweet on the side.',
};

/** True once the sentinel above a sticky bar has scrolled out of view (bar is "stuck"). */
function useStuck() {
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { rootMargin: '-110px 0px 0px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, stuck] as const;
}

/** Groups shown when "All" is selected (reference: one row per category with "View All"). */
const GROUPS = FILTERS.filter((f): f is Exclude<Filter, 'All' | 'Non-Coffee'> => f !== 'All' && f !== 'Non-Coffee');

function Grid({ items, keyPrefix, eagerCount = 8, row }: { items: Product[]; keyPrefix: string; eagerCount?: number; row?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 lg:gap-x-6 lg:gap-y-10 ${row ? '' : 'sm:grid-cols-3'}`}>
      {items.map((p, i) => (
        <div key={keyPrefix + p.id} className="animate-rise" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
          <ProductCard product={p} eager={i < eagerCount} className="menu-card" />
        </div>
      ))}
    </div>
  );
}

export default function Menu() {
  useTitle('Menu');
  const [params, setParams] = useSearchParams();
  const requested = params.get('cat') as Filter | null;
  const active: Filter = requested && FILTERS.includes(requested) ? requested : 'All';
  const pick = (f: string) => {
    setParams({ cat: f === 'All' ? null : f });
    scrollTo({ top: 0, behavior: 'smooth' });
  };

  const counts = Object.fromEntries(FILTERS.map((f) => [f, PRODUCTS.filter((p) => inFilter(p, f)).length]));
  const items = PRODUCTS.filter((p) => inFilter(p, active));
  const [sentinel, stuck] = useStuck();

  return (
    <>
      <PageHeader eyebrow="The KATRIBO Menu" title="Our Menu" accent="freshly made" sub="Handcrafted drinks made for good people." />

      <div ref={sentinel} aria-hidden="true" className="h-px" />
      <div className={`sticky top-[76px] z-30 border-b py-3 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 lg:top-[100px] lg:py-4 ${stuck ? 'border-white/[.08] bg-ink/92 shadow-[0_18px_40px_-24px_rgba(0,0,0,.95)]' : 'border-transparent bg-ink/80'}`}>
        <div className="shell">
          <FilterBar value={active} onChange={pick} options={FILTERS} label="Menu categories" counts={counts} />
        </div>
      </div>

      <div className="shell pt-6 pb-16 md:pt-10 md:pb-24">
        {active === 'All' ? (
          <div className="grid gap-12 md:gap-16">
            {GROUPS.map((g, gi) => {
              const list = PRODUCTS.filter((p) => p.category === g);
              if (!list.length) return null;
              const shown = list.slice(0, 4);
              return (
                <section key={g} aria-labelledby={`cat-${g}`}>
                  <Reveal className="mb-5 flex items-end justify-between gap-4 border-b border-white/[.07] pb-4 md:mb-7 md:pb-5">
                    <div className="min-w-0">
                      <h2 id={`cat-${g}`} className="text-[24px] font-extrabold tracking-[-0.02em] md:text-[32px]">
                        {g} <span className="ml-1 align-middle text-[14px] font-semibold text-mute md:text-[15px]">{list.length}</span>
                      </h2>
                      {BLURBS[g] && <p className="mt-1 text-[14px] text-mute md:text-[15.5px]">{BLURBS[g]}</p>}
                    </div>
                    <button type="button" onClick={() => pick(g)} className="view-all shrink-0" aria-label={`View all ${g}`}>
                      <ViewAllInner />
                    </button>
                  </Reveal>
                  <Grid items={shown} keyPrefix={g} eagerCount={gi === 0 ? 4 : 0} row />
                </section>
              );
            })}
          </div>
        ) : (
          <>
            <div className="mb-6 md:mb-8">
              <h2 className="text-[24px] font-extrabold tracking-[-0.02em] md:text-[32px]">{active} <span className="ml-1 align-middle text-[14px] font-semibold text-mute md:text-[15px]">{items.length}</span></h2>
              {BLURBS[active] && <p className="mt-1 text-[14px] text-mute md:text-[15.5px]">{BLURBS[active]}</p>}
            </div>
            <Grid items={items} keyPrefix={active} />
          </>
        )}
      </div>

      <VisitBanner />
    </>
  );
}
