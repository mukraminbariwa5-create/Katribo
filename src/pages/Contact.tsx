import { useState, type FormEvent, type ReactNode } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { Img, Placeholder, Reveal, SectionHead } from '../components/Primitives';
import { IMAGES, SITE } from '../data/site';
import { cx, useTitle } from '../lib/ui';

type F = { name: string; email: string; message: string };
const RULES: Record<keyof F, (v: string) => string> = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'),
};

function Info({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line"><Icon name={icon} size={20} /></span>
      <div className="pt-0.5"><h2 className="text-[16px] font-bold">{title}</h2><div className="mt-1 text-[15px] text-soft">{children}</div></div>
    </li>
  );
}

export default function Contact() {
  useTitle('Contact');
  const [f, setF] = useState<F>({ name: '', email: '', message: '' });
  const [err, setErr] = useState<Partial<F>>({});
  const [status, setStatus] = useState('');
  const socials: [keyof typeof SITE.social, IconName][] = [['facebook', 'facebook'], ['instagram', 'instagram'], ['tiktok', 'tiktok']];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = { name: RULES.name(f.name), email: RULES.email(f.email), message: RULES.message(f.message) };
    setErr(next);
    const first = (Object.keys(next) as (keyof F)[]).find((k) => next[k]);
    if (first) { document.getElementById(`c-${first}`)?.focus(); setStatus(''); return; }
    if (SITE.email) {
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Message from ' + f.name)}&body=${encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`)}`;
      setStatus('Your email app should open with your message ready to send.');
    } else {
      setStatus(`Thanks, ${f.name.trim().split(' ')[0]}! Online messages aren’t connected yet, so this one wasn’t sent. Please drop by the café or reach us on our social pages.`);
    }
  };

  const input = (k: keyof F, label: string, placeholder: string, props: Record<string, unknown> = {}) => (
    <div className="grid gap-2">
      <label htmlFor={`c-${k}`} className="text-[13.5px] font-semibold text-soft">{label}<span className="sr-only"> (required)</span></label>
      {k === 'message'
        ? <textarea id={`c-${k}`} rows={6} placeholder={placeholder} value={f[k]} onChange={(e) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: RULES[k](e.target.value) }); }}
            aria-invalid={err[k] ? true : undefined} aria-describedby={err[k] ? `c-${k}-err` : undefined} className="field-input min-h-[160px] resize-y" />
        : <input id={`c-${k}`} placeholder={placeholder} value={f[k]} onChange={(e) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: RULES[k](e.target.value) }); }}
            aria-invalid={err[k] ? true : undefined} aria-describedby={err[k] ? `c-${k}-err` : undefined} className="field-input" {...props} />}
      {err[k] && <p id={`c-${k}-err`} className="flex items-center gap-2 text-[13px]"><span className="grid h-4 w-4 place-items-center rounded-full bg-white text-[10px] font-black text-ink">!</span>{err[k]}</p>}
    </div>
  );

  return (
    <>
      <section className="shell grid gap-8 pt-[96px] pb-14 md:pt-[128px] lg:grid-cols-2 lg:gap-10 lg:pb-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.2fr)] xl:items-stretch xl:gap-8">
        <div>
          <p className="eyebrow mb-3 flex animate-rise items-center gap-3 md:mb-4"><span aria-hidden="true" className="h-px w-8 bg-crema/80" />Get in touch</p>
          <h1 className="display animate-rise text-[44px] sm:text-[60px] lg:text-[72px]">Contact <span className="text-outline">Us</span></h1>
          <p className="mt-3 animate-rise text-[16px] text-mute [animation-delay:60ms] md:text-[17px]">We&apos;d love to hear from you.</p>
          <ul className="mt-8 grid animate-rise gap-6 [animation-delay:120ms] lg:mt-10">
            <Info icon="pin" title="Visit Us">
              {SITE.address ? (
                <>
                  <span className="block">Katribo Slow Coffee Bar</span>
                  <span className="block text-mute">{SITE.address}</span>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Katribo Slow Coffee Bar, ' + SITE.address)}`} target="_blank" rel="noopener"
                    className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white underline-offset-4 hover:underline">
                    Get directions <Icon name="arrow-up-right" size={14} />
                  </a>
                </>
              ) : <Placeholder value={null} label="Street address — to be confirmed" />}
            </Info>
            <Info icon="mail" title="Message Us">{SITE.email ? <a href={`mailto:${SITE.email}`} className="underline-offset-4 hover:underline">{SITE.email}</a> : <Placeholder value={null} label="Email — to be confirmed" />}</Info>
            {SITE.phone && <Info icon="phone" title="Call Us">{SITE.phone}</Info>}
            {SITE.hours && <Info icon="clock" title="Opening Hours">{SITE.hours}</Info>}
            <Info icon="users" title="Follow Us">
              <ul className="mt-1 flex gap-2">
                {socials.map(([k, icon]) => (
                  <li key={k}>
                    {SITE.social[k]
                      ? <a href={SITE.social[k]!} target="_blank" rel="noopener" aria-label={`KATRIBO on ${k}`} className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink"><Icon name={icon} size={17} /></a>
                      : <span title={`${k} link — to be confirmed`} className="grid h-9 w-9 place-items-center rounded-full border border-dashed border-line text-white/35"><Icon name={icon} size={17} /></span>}
                  </li>
                ))}
              </ul>
            </Info>
          </ul>
        </div>

        <form noValidate onSubmit={submit} className="grid animate-rise content-start gap-4 rounded-3xl border border-line bg-ink-2 p-5 [animation-delay:160ms] sm:p-7 max-lg:order-2 xl:self-end">
          <div className="mb-1">
            <h2 className="text-[20px] font-extrabold tracking-[-0.015em] md:text-[22px]">Send us a message</h2>
            <p className="mt-1 text-[14px] text-mute">Questions, feedback, or event bookings — we read every one.</p>
          </div>
          {input('name', 'Name', 'Your name', { autoComplete: 'name' })}
          {input('email', 'Email', 'you@example.com', { type: 'email', autoComplete: 'email' })}
          {input('message', 'Message', 'How can we help?')}
          <button type="submit" className="btn btn-primary btn-lg mt-1 w-full"><span>Send Message</span><Icon name="arrow" size={17} className="arrow" /></button>
          {status && (
            <p role="status" className="flex animate-rise items-start gap-3 rounded-2xl border border-white/15 bg-card px-4 py-3.5 text-[14px] leading-relaxed text-soft">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-ink"><Icon name={SITE.email ? 'check' : 'info'} size={14} stroke={2.6} /></span>
              {status}
            </p>
          )}
        </form>

        <div className={cx('relative min-h-[220px] max-lg:order-1 animate-[hero-in_1.4s_var(--ease-out-quint)_both] overflow-hidden rounded-2xl sm:min-h-[320px] lg:col-span-2 lg:min-h-[360px] xl:col-span-1 xl:min-h-[560px]')}>
          <Img src={IMAGES.interior} alt="KATRIBO's coffee bar and dining area looking out over the bay" loading="eager" className="absolute inset-0 h-full w-full object-cover [object-position:50%_55%]" />
        </div>
      </section>

      <section className="shell pb-16 md:pb-24" aria-labelledby="loc">
        <SectionHead id="loc" title="Location" sub="Find our backyard by the bay." />
        <Reveal className="relative overflow-hidden rounded-2xl border border-line">
          {SITE.mapEmbed ? (
            <iframe src={SITE.mapEmbed} title="Map showing KATRIBO's location" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full grayscale invert-[.92] sm:aspect-[21/6]" />
          ) : (
            <div className="relative aspect-[4/3] sm:aspect-[21/6]">
              <Img src={IMAGES.interior} alt="" className="absolute inset-0 h-full w-full object-cover brightness-[.28] grayscale-[.4]" />
              <div className="absolute inset-0 grid place-content-center justify-items-center gap-2 p-6 text-center">
                <span className="mb-2 grid h-12 w-12 place-items-center rounded-full border border-[#444] bg-ink"><Icon name="pin" size={22} /></span>
                <p className="font-bold">Map coming soon</p>
                <p className="text-sm text-mute">Our backyard by the bay — the map will be here soon.</p>
              </div>
            </div>
          )}
        </Reveal>
      </section>
    </>
  );
}
