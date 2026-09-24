import Image from "next/image";
import { Kicker, HeadingDivider } from "@/components/ui";

function ExcursionCard({ num, tag, title, text, image, alt, heightClass }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${heightClass}`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
      <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide">
        {num} &middot; {tag}
      </span>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h3 className="font-belleza text-lg sm:text-xl text-white leading-snug mb-1.5 drop-shadow-md">
          {title}
        </h3>
        <p className="text-white/90 text-xs sm:text-[13px] leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function KundaliniExcursionsSection() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-[#f4efe6] border-b border-[#e3dac9]/70 font-figtree">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-5 lg:px-2">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <Kicker>Beyond the Yoga Hall</Kicker>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] drop-shadow-2xs">
            Excursions &amp; Cultural Life
          </h2>
          <HeadingDivider />
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            A real education never stops at the edge of the yoga hall. Woven through your complete Kundalini immersion is a short excursion trip and a handful of small rituals that tie your practice to the living culture all around you — for many students, these turn out to be the memories they hold onto longest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <ExcursionCard
              num="01"
              tag="At Dusk"
              title="The Evening Ganga Aarti"
              text="As dusk falls, walk down to the Ganges for the aarti — priests circle great brass lamps and the whole bank glows amber against the dark. Many students describe it as the first time in years they felt completely still."
              image="/images/excusrion-activity/evening-ganga-aarti.jpg"
              alt="Evening Ganga Aarti fire ceremony in Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
            <ExcursionCard
              num="02"
              tag="On the Excursion"
              title="Waterfall Treks"
              text="A short trek climbs to the waterfalls hidden in the hills above Rishikesh — cold water, green shade and the best kind of tired."
              image="/images/excusrion-activity/waterfall-trek.jpg"
              alt="Waterfall trek in the hills above Rishikesh"
              heightClass="h-[220px] sm:h-[240px]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <ExcursionCard
              num="03"
              tag="Some Mornings"
              title="Kundalini Practice on the Ganges Ghat"
              text="Some sessions leave the yoga hall entirely — pranayama and chakra meditation right on the riverbank, with the Ganges moving past as your soundtrack."
              image="/images/excusrion-activity/yoga-on-ganga-ghat.jpg"
              alt="Kundalini practice on the Ganges riverbank in Rishikesh"
              heightClass="h-[220px] sm:h-[240px]"
            />
            <ExcursionCard
              num="04"
              tag="In Silence"
              title="Himalayan Cave Meditation"
              text="A short trip takes you to sacred caves in the foothills, where sages once sat in silence for centuries. Meditating inside, in the cool and the dark, is a quiet that stays with you long after you have left."
              image="/images/excusrion-activity/cave-meditation.jpg"
              alt="Meditation in a Himalayan cave near Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <ExcursionCard
              num="05"
              tag="Living History"
              title="Historic Temples"
              text="A guided visit to the old temples of Rishikesh — riverside shrines and sacred sites where the tradition you study in class has been practiced without pause for centuries."
              image="/images/excusrion-activity/historic-temples.jpg"
              alt="Guided temple visit in Rishikesh"
              heightClass="h-[280px] sm:h-[420px]"
            />
            <ExcursionCard
              num="06"
              tag="Between Practice Days"
              title="Nature Walks & Sacred Sites"
              text="Gentle walks into the hills and slow time by the sacred river — none of it compulsory, none of it rushed."
              image="/images/excusrion-activity/nature-walk.jpg"
              alt="Nature walk by the Ganges river in Rishikesh"
              heightClass="h-[220px] sm:h-[240px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
