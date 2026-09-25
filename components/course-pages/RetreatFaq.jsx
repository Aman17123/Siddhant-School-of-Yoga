import { SectionHead, Accordion } from "@/components/course-pages/RetreatUI";
import { sharedRetreatFaqs } from "@/data/retreatSharedFaqs";

export default function RetreatFaq({ title, pageFaqs = [], bgClassName = "bg-[#fdfbf7]" }) {
  const items = [...pageFaqs, ...sharedRetreatFaqs];
  return (
    <section id="faq" className={`scroll-mt-28 py-14 sm:py-16 lg:py-20 ${bgClassName} border-b border-[#e3dac9]/70 font-figtree`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <SectionHead kicker="FAQs" title={title} />
        <Accordion items={items} defaultOpen={null} initialCount={5} />
      </div>
    </section>
  );
}
