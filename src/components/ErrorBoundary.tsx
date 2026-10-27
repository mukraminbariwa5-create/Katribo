import { Component, type ReactNode } from 'react';
import { Icon } from './Icon';

/** Catches crashes (including a page that failed to download) and shows a calm recovery screen. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.error('[KATRIBO] page error:', error); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="shell grid min-h-[80svh] place-content-center justify-items-center pt-24 pb-16 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-ink shadow-[0_0_0_10px_rgba(255,255,255,.06),0_0_40px_rgba(255,255,255,.18)]"><Icon name="cup" size={34} /></span>
        <h1 className="display mt-7 text-[36px] sm:text-[52px]">Something <span className="text-outline">spilled</span></h1>
        <p className="mt-4 max-w-[440px] text-[17px] leading-relaxed text-soft">This page didn’t load properly — it’s usually a weak connection. Please try again.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={() => location.reload()} className="btn btn-primary btn-lg"><span>Try Again</span><Icon name="arrow" size={17} className="arrow" /></button>
          <a href="/" className="btn btn-outline btn-lg"><span>Back Home</span></a>
        </div>
      </section>
    );
  }
}
