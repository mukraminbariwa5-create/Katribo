import { Icon, type IconName } from '../components/Icon';
import { ButtonLink, Img, Reveal } from '../components/Primitives';
import { IMAGES } from '../data/site';
import { cx, useParallax, useTitle } from '../lib/ui';

const VALUES: [IconName, string, string][] = [
  ['leaf', 'Quality Beans', 'Carefully selected'],
  ['heart', 'Crafted with Care', 'Made by passionate baristas'],
  ['users', 'A Cozy Space', 'For everyone'],
  ['wave', 'Good Vibes', 'By the Bay'],
];

const PILLARS: [string, string, string, string, string][] = [
  ['01', 'Quality Coffee', 'Carefully selected beans, prepared at the bar by baristas who care about every cup.', IMAGES.bar, '50% 50%'],
  ['02', 'Friendly Atmosphere', 'Good conversations and good people — a place where everyone is welcome.', IMAGES.sign, '50% 40%'],
  ['03', 'The Backyard Experience', 'A cozy space by the bay to slow down and enjoy the simple moments.', IMAGES.interior, '50% 48%'],
];

export default function About() {
  useTitle('About');
  const bg = useParallax<HTMLImageElement>(0.08);
  return (
    <>
      {/* Hero — photo on the right fading into black (reference "About KATRIBO" frame) */}
      <section className="relative isolate overflow-hidden pt-[104px] pb-12 md:pt-[150px] md:pb-16">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden md:w-[66%]">
          <img ref={bg} src={IMAGES.sign} alt="" fetchPriority="high"
            className="h-[115%] w-full object-cover [object-position:50%_0%] brightness-[.5] saturate-[.85] max-md:origin-[75%_0] max-md:scale-[1.6] md:[object-position:50%_58%] md:brightness-[.62]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-ink)_0%,rgba(8,8,8,.85)_45%,rgba(8,8,8,.65)_100%)] md:bg-[linear-gradient(90deg,var(--color-ink)_0%,rgba(8,8,8,.7)_32%,rgba(8,8,8,.05)_72%),linear-gradient(0deg,var(--color-ink)_0%,var(--color-ink)_30%,rgba(8,8,8,.55)_52%,transparent_72%)]" />
        </div>
        <div className="shell">
          <div className="max-w-[640px]">
            <p className="eyebrow flex animate-rise items-center gap-3"><span aria-hidden="true" className="h-px w-8 bg-crema/80" />Our Story</p>
            <h1 className="display mt-3 animate-rise text-[44px] sm:text-[60px] lg:text-[72px]">About <span className="text-outline">KATRIBO</span></h1>
            <p className="mt-6 max-w-[560px] animate-rise text-[16px] leading-relaxed text-[#e6e6e6] [animation-delay:80ms] lg:text-[19px]">
              KATRIBO is more than just a coffee shop. It&apos;s a backyard for good coffee, good conversations, and good people.
              Inspired by the view, the community, and the simple moments that make life better.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 rounded-2xl border border-line bg-ink-2/80 py-4 backdrop-blur-sm md:mt-20 md:grid-cols-4 md:rounded-none md:border-0 md:bg-transparent md:py-0 md:backdrop-blur-none">
            {VALUES.map(([icon, a, b], i) => (
              <li key={a} style={{ animationDelay: `${200 + i * 70}ms` }}
                className={cx('grid animate-rise justify-items-center gap-1 px-3 py-2.5 text-center md:py-1',
                  i % 2 === 1 && 'border-l border-line', i === 2 && 'md:border-l md:border-line', i >= 2 && 'max-md:border-t max-md:border-line max-md:pt-4 max-md:mt-2')}>
                <Icon name={icon} size={30} className="mb-2" />
                <strong className="text-[15px] font-bold md:text-[18px]">{a}</strong>
                <span className="text-[13px] text-mute md:text-[15px]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The view */}
      <section className="shell pb-16 md:pb-24">
        <Reveal className="relative overflow-hidden rounded-2xl">
          <Img src={IMAGES.bay} alt="View of the bay and outdoor tables through KATRIBO's front windows" width={1536} height={460}
            className="aspect-[16/10] w-full object-cover sm:aspect-[1536/400]" />
          <p className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-4 py-2 text-[13px] font-medium backdrop-blur">The view from inside — our backyard by the bay.</p>
        </Reveal>
      </section>

      {/* Meet the team */}
      <section className="shell pb-16 md:pb-24" aria-labelledby="team">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-ink-2 md:grid-cols-2 md:gap-0">
          <Reveal className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[420px]">
            <Img src={IMAGES.staff} alt="The KATRIBO team behind the bar" className="absolute inset-0 h-full w-full object-cover [object-position:50%_55%]" />
          </Reveal>
          <Reveal delay={80} className="px-6 pb-8 md:px-12 md:py-14 lg:px-16">
            <p className="eyebrow">Meet the team</p>
            <h2 id="team" className="display mt-3 text-[34px] md:text-[48px]">The People <span className="text-outline">Behind the Bar</span></h2>
            <p className="mt-5 max-w-[460px] text-[15.5px] leading-relaxed text-mute md:text-[17px]">
              Every cup at KATRIBO is made by our own baristas. Better people make better coffee — come by, say hi, and tell us how you like your drink.
            </p>
            <div className="mt-7"><ButtonLink to="/menu" arrow>Order a Drink</ButtonLink></div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="shell pb-16 md:pb-24" aria-labelledby="philo">
        <Reveal className="mb-8 md:mb-10">
          <p className="eyebrow">What we care about</p>
          <h2 id="philo" className="display mt-3 text-[34px] md:text-[56px]">Good Coffee, <span className="text-outline">Better People</span></h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {PILLARS.map(([n, title, text, src, pos], i) => (
            <Reveal key={n} delay={i * 80} className="group overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-500 hover:bg-raised">
              <div className="aspect-[16/10] overflow-hidden">
                <Img src={src} alt="" style={{ objectPosition: pos }} className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-quint)] group-hover:scale-[1.05]" />
              </div>
              <div className="p-6 md:p-7">
                <span className="text-[13px] font-semibold tracking-[.12em] text-mute">{n}</span>
                <h3 className="mt-2 text-[21px] font-extrabold tracking-[-0.015em] md:text-[24px]">{title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-mute">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-20 text-center md:pb-28">
        <Reveal>
          <p className="display text-[40px] sm:text-[68px] lg:text-[100px]">“Welcome to<br /><span className="text-outline">Our Backyard.”</span></p>
          <p className="mt-5 text-[13px] tracking-[.24em] text-mute uppercase">— KATRIBO</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/menu" size="lg" arrow>See the Menu</ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="outline">Visit Us</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
