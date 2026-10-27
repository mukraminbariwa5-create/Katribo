import { IMAGES } from '../data/site';
import { ButtonLink, Cursive, Img, Reveal } from './Primitives';

/** Full-width closing section for inner pages: the bay view, the slogan, and two next steps. */
export function VisitBanner({ primary = { to: '/contact', label: 'Visit Us' }, secondary = { to: '/menu', label: 'See the Menu' } }:
  { primary?: { to: string; label: string }; secondary?: { to: string; label: string } }) {
  return (
    <section className="shell pb-20 md:pb-28" aria-labelledby="visit-title">
      <Reveal className="grain relative isolate flex min-h-[380px] items-end overflow-hidden rounded-3xl md:min-h-[460px] md:items-center">
        <Img src={IMAGES.bay} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover [object-position:50%_55%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(8,8,8,.92)_0%,rgba(8,8,8,.55)_55%,rgba(8,8,8,.25)_100%)] md:bg-[linear-gradient(90deg,rgba(8,8,8,.9)_0%,rgba(8,8,8,.6)_45%,rgba(8,8,8,.1)_100%)]" />
        <div className="relative z-[2] max-w-[560px] p-6 sm:p-10 md:p-14">
          <Cursive as="p" text="by the bay" className="-rotate-3 text-[40px] text-soft md:text-[56px]" />
          <h2 id="visit-title" className="display mt-1 text-[38px] sm:text-[52px] md:text-[64px]">Visit Our <span className="text-outline">Backyard</span></h2>
          <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-soft md:text-[17px]">
            Good coffee, good conversations, and a view worth slowing down for.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to={primary.to} arrow>{primary.label}</ButtonLink>
            <ButtonLink to={secondary.to} variant="outline">{secondary.label}</ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
