import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Home as HomeIcon,
  Check,
  Minus,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CtaBanner from "@/components/home/CtaBanner";
import { Kicker, HeadingDivider, ButtonLink } from "@/components/ui";
import { site } from "@/data/siteData";

export const HUB_PATH = "/why-choose-siddhant-school-of-yoga";

// Builds Next.js metadata for a Why Us page from its data file.
export function buildWhyUsMetadata(page) {
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: { canonical: `/${page.slug}` },
  };
}

function isExternal(href) {
  return /^https?:\/\//.test(href);
}

function Buttons({ buttons, center = false }) {
  if (!buttons?.length) return null;
  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      {buttons.map((b, i) => (
        <ButtonLink
          key={b.label}
          href={b.href}
          variant={b.variant || (i === 0 ? "primary" : "secondary")}
          {...(isExternal(b.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {b.label}
        </ButtonLink>
      ))}
    </div>
  );
}

function Highlight({ children }) {
  return (
    <p className="border-l-4 border-[#b85c00] bg-[#f4efe6] rounded-r-xl px-4 sm:px-5 py-3 text-sm sm:text-base font-semibold text-[#1c3b2b] leading-relaxed">
      {children}
    </p>
  );
}

function BulletList({ items, className = "" }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-stone-700 leading-relaxed">
          <Check className="w-4 h-4 text-[#1c3b2b] shrink-0 mt-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Desktop: a real table. Mobile: each row becomes a stacked card, so nothing scrolls sideways.
function DataTable({ table }) {
  return (
    <>
      <div className="hidden md:block overflow-hidden rounded-2xl border border-[#e3dac9] bg-[#fdfbf7]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1c3b2b] text-white">
            <tr>
              {table.head.map((h) => (
                <th key={h} className="px-5 py-3 font-semibold tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e3dac9]">
            {table.rows.map((row) => (
              <tr key={row.join("|")} className="even:bg-[#f4efe6]/60">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-5 py-3 leading-relaxed ${ci === 0 ? "font-semibold text-[#1c3b2b]" : "text-stone-700"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {table.rows.map((row) => (
          <div key={row.join("|")} className="rounded-2xl border border-[#e3dac9] bg-[#fdfbf7] p-4">
            <p className="font-semibold text-[#1c3b2b] mb-2">{row[0]}</p>
            <dl className="space-y-1.5">
              {row.slice(1).map((cell, ci) => (
                <div key={ci} className="text-sm leading-relaxed">
                  <dt className="inline font-semibold text-stone-500">{table.head[ci + 1]}: </dt>
                  <dd className="inline text-stone-700">{cell}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}

function Compare({ compare }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[compare.left, compare.right].map((col, i) => (
        <div
          key={col.title}
          className={`rounded-2xl border border-[#e3dac9] p-6 sm:p-7 ${i === 0 ? "bg-[#f4efe6]" : "bg-[#fdfbf7]"}`}
        >
          <h3 className="font-belleza text-xl sm:text-2xl font-normal text-[#1e2422] tracking-wide mb-4">
            {col.title}
          </h3>
          <ul className="space-y-2.5">
            {col.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-stone-700 leading-relaxed">
                {i === 0 ? (
                  <Check className="w-4 h-4 text-[#1c3b2b] shrink-0 mt-1" />
                ) : (
                  <Minus className="w-4 h-4 text-[#b85c00] shrink-0 mt-1" />
                )}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Cards({ cards }) {
  const cols = cards.length % 3 === 0 || cards.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-4 sm:gap-5`}>
      {cards.map((card) => (
        <div key={card.title} className="bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 sm:p-6 shadow-xs">
          <h3 className="font-belleza text-lg sm:text-xl font-normal text-[#1e2422] tracking-wide mb-2">
            {card.title}
          </h3>
          <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">{card.desc}</p>
          {card.href && (
            <Link
              href={card.href}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#b85c00] hover:text-[#96490a]"
            >
              {card.linkLabel || "Learn more"} <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

function Steps({ steps }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4 bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 sm:p-6">
          <span className="shrink-0 w-10 h-10 rounded-full bg-[#1c3b2b] text-white font-semibold flex items-center justify-center text-sm">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-belleza text-lg sm:text-xl font-normal text-[#1e2422] tracking-wide mb-1">
              {step.title}
            </h3>
            <p className="text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">{step.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function LinkList({ links }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((l) => (
        <Link
          key={l.href + l.label}
          href={l.href}
          className="group flex flex-col bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 hover:shadow-md transition-shadow"
        >
          <span className="font-belleza text-lg font-normal text-[#1e2422] tracking-wide flex items-center gap-2">
            {l.label}
            <ArrowRight className="w-4 h-4 text-[#b85c00] group-hover:translate-x-0.5 transition-transform" />
          </span>
          {l.desc && <span className="mt-1 text-sm text-stone-600 leading-relaxed">{l.desc}</span>}
        </Link>
      ))}
    </div>
  );
}

function Section({ section, index }) {
  const bg = index % 2 === 0 ? "bg-[#fdfbf7]" : "bg-[#f4efe6]";
  const hasImage = Boolean(section.image);
  const wide = section.cards || section.steps || section.table || section.compare || section.links;

  const text = (
    <div className={hasImage ? "text-center lg:text-left" : "max-w-3xl mx-auto"}>
      {section.body?.map((p) => (
        <p key={p} className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium mb-4 last:mb-0">
          {p}
        </p>
      ))}
      {section.quote && (
        <blockquote className="mt-5 border-l-4 border-[#b85c00] bg-[#fdfbf7] rounded-r-xl px-5 py-4 text-left">
          <p className="italic text-stone-700 leading-relaxed">{section.quote.text}</p>
          {section.quote.translation && (
            <p className="mt-2 text-sm sm:text-[15px] text-[#1c3b2b] font-semibold leading-relaxed">
              {section.quote.translation}
            </p>
          )}
          {section.quote.source && (
            <footer className="mt-2 text-xs font-semibold text-stone-500 tracking-wide">— {section.quote.source}</footer>
          )}
        </blockquote>
      )}
      {section.bullets && <BulletList items={section.bullets} className="mt-5 text-left" />}
      {section.highlight && (
        <div className="mt-5 text-left">
          <Highlight>{section.highlight}</Highlight>
        </div>
      )}
      {section.button && (
        <div className={`mt-6 ${hasImage ? "" : "text-center"}`}>
          <Buttons buttons={[section.button]} center={!hasImage} />
        </div>
      )}
    </div>
  );

  return (
    <section className={`py-14 sm:py-16 lg:py-20 ${bg} border-b border-[#e3dac9]/70 font-figtree`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
        {hasImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-white ${section.imageRight ? "lg:order-2" : ""}`}>
              <Image src={section.image} alt={section.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div>
              <div className="text-center lg:text-left">
                {section.kicker && <Kicker>{section.kicker}</Kicker>}
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                  {section.title}
                </h2>
                <HeadingDivider center={false} />
              </div>
              <div className="mt-4">{text}</div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
              {section.kicker && <Kicker>{section.kicker}</Kicker>}
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                {section.title}
              </h2>
              <HeadingDivider />
            </div>
            {(section.body || section.quote || section.bullets || section.highlight || section.button) && (
              <div className={wide ? "mb-8" : ""}>{text}</div>
            )}
            {section.cards && <Cards cards={section.cards} />}
            {section.steps && <Steps steps={section.steps} />}
            {section.table && (
              <div className="max-w-5xl mx-auto">
                <DataTable table={section.table} />
              </div>
            )}
            {section.compare && (
              <div className="max-w-5xl mx-auto">
                <Compare compare={section.compare} />
              </div>
            )}
            {section.links && <LinkList links={section.links} />}
            {section.after && (
              <p className="max-w-3xl mx-auto mt-6 text-center text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
                {section.after}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default function WhyUsPage({ page }) {
  const url = `${site.url}/${page.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: page.hero.title,
        description: page.seo.description,
        inLanguage: "en-US",
        author: { "@type": "Person", name: "Acharya Siddhant" },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Why Choose Us", item: `${site.url}${HUB_PATH}` },
          { "@type": "ListItem", position: 3, name: page.breadcrumb, item: url },
        ],
      },
      ...(page.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: page.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#1c3b2b]/30 selection:text-[#142b1e]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="flex-grow bg-[#fdfbf7]">
        {/* Hero */}
        <section className="relative min-h-fit sm:min-h-[500px] lg:h-[70vh] lg:max-h-[740px] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/images/hero-bg.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pt-8 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-36">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 max-w-xl text-left">
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center justify-start gap-1.5 mb-3 text-xs sm:text-sm font-figtree font-medium text-[#142b1e]/80"
                >
                  <Link href="/" className="flex items-center gap-1 hover:text-[#1c3b2b] transition-colors">
                    <HomeIcon className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <Link href={HUB_PATH} className="hover:text-[#1c3b2b] transition-colors">
                    Why Us
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-[#142b1e]/50 shrink-0" />
                  <span className="text-[#142b1e] font-semibold">{page.breadcrumb}</span>
                </nav>

                <h1 className="font-belleza tracking-wide text-[#1e2422] leading-[1.2] text-3xl sm:text-4xl lg:text-[44px] font-normal">
                  {page.hero.title}
                </h1>

                {page.hero.intro.map((p) => (
                  <p key={p} className="mt-3 text-sm sm:text-[15px] font-figtree font-medium text-[#142b1e]/90 leading-relaxed max-w-md">
                    {p}
                  </p>
                ))}

                {page.hero.chips && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {page.hero.chips.map((c) => (
                      <li
                        key={c}
                        className="text-[11px] sm:text-xs font-figtree font-semibold px-3 py-1.5 rounded-full bg-white/90 text-[#1c3b2b] border border-[#1c3b2b]/20 shadow-2xs"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6">
                  <Buttons buttons={page.hero.buttons} />
                </div>
              </div>

              <div className="w-full lg:w-1/2 py-0 sm:py-6 lg:py-16">
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image
                    src={page.hero.image}
                    alt={page.hero.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {page.sections.map((section, i) => (
          <Section key={section.title} section={section} index={i} />
        ))}

        {/* FAQ */}
        {page.faqs?.length > 0 && (
          <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
            <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-8 lg:mb-10">
                <Kicker>Questions</Kicker>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
                  Frequently Asked Questions
                </h2>
                <HeadingDivider />
              </div>
              <div className="space-y-3">
                {page.faqs.map((faq) => (
                  <details key={faq.q} className="group bg-[#fdfbf7] rounded-2xl border border-[#e3dac9] p-5 sm:p-6">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                      <h3 className="font-belleza text-base sm:text-lg font-normal text-[#1e2422] tracking-wide">{faq.q}</h3>
                      <ChevronDown className="w-5 h-5 text-[#1c3b2b] shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-sm sm:text-[15px] text-stone-700 leading-relaxed font-medium">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA + related pages */}
        <section className="py-14 sm:py-16 bg-[#fdfbf7] font-figtree">
          <div className="max-w-3xl mx-auto px-4 text-center">
            {page.cta.text && (
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-medium">{page.cta.text}</p>
            )}
            <p className="mt-3 font-belleza text-xl sm:text-2xl text-[#1c3b2b] tracking-wide">
              {page.cta.highlight || "Learn → Practice → Teach → Reflect. For Real Understanding."}
            </p>
            <div className="mt-6">
              <Buttons buttons={page.cta.buttons} center />
            </div>
          </div>

          {page.related?.length > 0 && (
            <div className="max-w-[1200px] mx-auto px-4 sm:px-5 mt-12">
              <h2 className="text-center font-belleza text-xl sm:text-2xl text-[#1e2422] tracking-wide mb-6">
                Continue Exploring
              </h2>
              <LinkList links={page.related} />
            </div>
          )}
        </section>

        <CtaBanner />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
