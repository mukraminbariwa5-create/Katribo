/**
 * Tiny client-side router (History API) — zero dependencies, ~2 KB.
 * Provides <RouterProvider>, <Link>, <NavLink>, useLocation, useNavigate,
 * useParams-style matching and useSearchParams, with scroll restoration.
 */
import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState,
  type AnchorHTMLAttributes, type MouseEvent, type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';

interface Loc { pathname: string; search: string; hash: string; key: number }
interface Ctx { location: Loc; navigate: (to: string, opts?: { replace?: boolean; scroll?: boolean }) => void }

const RouterContext = createContext<Ctx | null>(null);

/** Page transitions via the browser's View Transitions API (Chrome, Edge, Safari 18+); instant elsewhere or with reduced motion. */
const canTransition = () =>
  typeof document !== 'undefined' && 'startViewTransition' in document && !matchMedia('(prefers-reduced-motion: reduce)').matches;
function withTransition(update: () => void) {
  if (!canTransition() || document.visibilityState !== 'visible') { update(); return; }
  let ran = false;
  const run = () => { if (ran) return; ran = true; flushSync(update); };
  const vt = (document as Document & { startViewTransition: (cb: () => void) => { skipTransition?: () => void } }).startViewTransition(run);
  // Safety net: if the browser can't paint right now (background tab, throttled frames), switch pages anyway.
  setTimeout(() => { if (!ran) { vt.skipTransition?.(); run(); } }, 250);
}
if (canTransition()) document.documentElement.classList.add('has-vt');
let keySeq = 0;
let currentPath = typeof location !== 'undefined' ? location.pathname : '/';
const read = (): Loc => ({ pathname: location.pathname, search: location.search, hash: location.hash, key: ++keySeq });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState<Loc>(read);
  const [restoreY, setRestoreY] = useState<number | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const onPop = (e: PopStateEvent) => {
      const next = read();
      const update = () => { setLoc(next); setRestoreY(typeof e.state?.y === 'number' ? e.state.y : 0); };
      if (next.pathname !== currentPath) withTransition(update); else update();
      currentPath = next.pathname;
    };
    addEventListener('popstate', onPop);
    return () => removeEventListener('popstate', onPop);
  }, []);

  // Restore scroll after back/forward once the new page has rendered.
  useLayoutEffect(() => {
    if (restoreY == null) return;
    const y = restoreY;
    let tries = 0;
    // Try now, then keep retrying briefly while images/lazy sections give the page its full height.
    const tick = () => {
      scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
      if (Math.abs(scrollY - y) > 2 && tries++ < 40) setTimeout(tick, 40);
    };
    tick();
    setRestoreY(null);
  }, [restoreY]);

  const navigate = useCallback<Ctx['navigate']>((to, opts = {}) => {
    const url = new URL(to, location.href);
    if (url.origin !== location.origin) { location.href = to; return; }
    const target = url.pathname + url.search + url.hash;
    const here = location.pathname + location.search;
    const changesPage = url.pathname !== location.pathname;
    history.replaceState({ ...(history.state ?? {}), y: scrollY }, '');
    // `from` remembers the in-app page we came from, so "Back" can return there (with its scroll position).
    if (opts.replace) history.replaceState({ y: 0, from: history.state?.from }, '', target);
    else history.pushState({ y: 0, from: here }, '', target);
    currentPath = url.pathname;
    const update = () => {
      setLoc(read());
      if (opts.scroll !== false && !url.hash) scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    if (changesPage) withTransition(update); else update();
    if (opts.scroll !== false && url.hash) setTimeout(() => document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), changesPage ? 450 : 0);
  }, []);

  const value = useMemo(() => ({ location: loc, navigate }), [loc, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('Router hooks must be used inside <RouterProvider>');
  return ctx;
}

export const useLocation = () => useRouter().location;
export const useNavigate = () => useRouter().navigate;

/** Match "/menu/:id" against a pathname. Returns params or null. */
export function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const p = pattern.split('/').filter(Boolean);
  const s = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (p.length !== s.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(s[i]);
    else if (p[i] !== s[i]) return null;
  }
  return params;
}

export function useSearchParams(): [URLSearchParams, (next: Record<string, string | null>) => void] {
  const { location: loc, navigate } = useRouter();
  const params = useMemo(() => new URLSearchParams(loc.search), [loc.search]);
  const set = useCallback((next: Record<string, string | null>) => {
    const sp = new URLSearchParams(loc.search);
    Object.entries(next).forEach(([k, v]) => (v == null ? sp.delete(k) : sp.set(k, v)));
    const qs = sp.toString();
    navigate(loc.pathname + (qs ? `?${qs}` : ''), { replace: true, scroll: false });
  }, [loc.pathname, loc.search, navigate]);
  return [params, set];
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; replace?: boolean };

export function Link({ to, replace, onClick, target, ...rest }: LinkProps) {
  const navigate = useNavigate();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === '_blank') return;
    if (/^(https?:|mailto:|tel:)/.test(to)) return;
    e.preventDefault();
    navigate(to, { replace });
  };
  return <a href={to} target={target} onClick={handle} {...rest} />;
}

type NavLinkProps = Omit<LinkProps, 'className'> & {
  end?: boolean;
  className?: string | ((s: { isActive: boolean }) => string);
};

export function NavLink({ to, end, className, ...rest }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = end || to === '/' ? pathname === to : pathname === to || pathname.startsWith(to + '/');
  const cls = typeof className === 'function' ? className({ isActive }) : className;
  return <Link to={to} className={cls} aria-current={isActive ? 'page' : undefined} {...rest} />;
}

/** Where the visitor came from inside the site (null after a direct visit or reload of a fresh tab). */
export function useCameFrom(): string | null {
  useLocation(); // re-read on every navigation
  const from = typeof history !== 'undefined' ? history.state?.from : null;
  return typeof from === 'string' ? from : null;
}

/** Friendly name for an in-app path, for "Back to …" labels. */
export function pageName(path: string | null): string {
  if (!path) return 'Menu';
  const p = path.split('?')[0];
  if (p === '/') return 'Home';
  if (p.startsWith('/menu/')) return 'Previous';
  const names: Record<string, string> = { '/menu': 'Menu', '/about': 'About', '/gallery': 'Gallery', '/contact': 'Contact', '/cart': 'Cart', '/checkout': 'Checkout' };
  return names[p] ?? 'Previous';
}
