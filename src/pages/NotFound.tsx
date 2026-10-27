import { ButtonLink, Cursive, Img, Reveal } from '../components/Primitives';
import { ProductCard } from '../components/ProductCard';
import { pick } from '../data/menu';
import { IMAGES } from '../data/site';
import { useTitle } from '../lib/ui';

/** Friendly "not found" screen — used for unknown pages and for drinks that no longer exist. */
export default function NotFound({ title = 'This page wandered off', message = 'The page you’re looking for isn’t here — but the good coffee is.', docTitle = 'Page not found' }:
  { title?: string; message?: string; docTitle?: string; params?: Record<string, string> }) {
  useTitle(docTitle);
  const popular = pick(['caramel-macchiato', 'spanish-latte', 'matcha-latte', 'cookies-cream']);
  return (
    <>
      <section className="relative isolate overflow-hidden pt-[96px] md:pt-[128px]">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Img src={IMAGES.interior} alt="" className="h-full w-full object-cover [object-position:50%_55%] opacity-30 saturate-[.6]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.85)_0%,rgba(8,8,8,.75)_50%,#080808_100%)]" />
        </div>
        <div className="shell grid min-h-[62svh] place-content-center justify-items-center pb-16 text-center">
          <p aria-hidden="true" className="display text-outline animate-rise text-[120px] leading-none opacity-60 sm:text-[180px] lg:text-[220px]">404</p>
          <Cursive as="p" text="lost your way?" className="-mt-6 -rotate-3 animate-rise text-[38px] text-crema [animation-delay:60ms] sm:-mt-10 sm:text-[52px]" />
          <h1 className="display mt-4 max-w-[760px] animate-rise text-[34px] [animation-delay:120ms] sm:text-[52px]">{title}</h1>
          <p className="mt-4 max-w-[480px] animate-rise text-[17px] leading-relaxed text-soft [animation-delay:160ms]">{message}</p>
          <div className="mt-8 flex animate-rise flex-wrap justify-center gap-3 [animation-delay:200ms]">
            <ButtonLink to="/menu" size="lg" arrow>See the Menu</ButtonLink>
            <ButtonLink to="/" size="lg" variant="outline">Back Home</ButtonLink>
          </div>
        </div>
      </section>
      <section className="shell pb-16 md:pb-24" aria-labelledby="pop-title">
        <Reveal className="mb-6 md:mb-8">
          <p className="eyebrow flex items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-crema/80" />While you’re here</p>
          <h2 id="pop-title" className="display mt-3 text-[30px] sm:text-[40px]">Popular Drinks</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:gap-6">
          {popular.map((p, i) => <Reveal key={p.id} delay={i * 60}><ProductCard product={p} /></Reveal>)}
        </div>
      </section>
    </>
  );
}
