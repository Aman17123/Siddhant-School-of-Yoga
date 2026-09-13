import Image from 'next/image';
import { Wind, HeartHandshake, Home, CheckCircle } from 'lucide-react';

export default function WhyUnique() {
  const uniqueFeatures = [
    {
      badge: 'Breath of Life',
      title: "World's First Pranayama-Focused Approach",
      subtitle: 'Transcending physical shapes into the mastery of vital life-force energy (Prana).',
      description:
        'While conventional schools often confine yoga to gymnastics or aesthetic poses, Siddhant School of Yoga places Pranayama at the heart of our pedagogy. Acharya Siddhant has revived ancient breath retention (kumbhaka), subtle bandhas, and therapeutic breathing sequences that systematically calm the nervous system, sharpen cognitive focus, and unlock spiritual ecstasy.',
      points: [
        'Master over 12 classical Himalayan pranayama techniques',
        'Scientific breath mechanics aligned with modern neuroscience',
        'Direct connection between pranic channels (nadis) and emotional mastery',
      ],
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80',
      alt: 'World first Pranayama focused yoga teacher training in Rishikesh',
      reversed: false,
    },
    {
      badge: 'Mindset Transformation',
      title: 'Gratitude & Motivation Centre Philosophy',
      subtitle: 'Living and practicing yoga without complaint — anchored in deep appreciation.',
      description:
        'True yoga is not what happens on the mat for 90 minutes; it is how you navigate every second of life. Our signature Gratitude & Motivation Centre instills emotional resilience, inner contentment (santosha), and purposeful service. Students undergo a profound psychological shift, transforming stress and victimhood into empowered gratitude and radiant confidence.',
      points: [
        'Daily gratitude circles and guided emotional release workshops',
        'Overcome mental fatigue, fear of teaching, and imposter syndrome',
        'Learn to lead classes infused with genuine inspiration and heart',
      ],
      icon: HeartHandshake,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80',
      alt: 'Gratitude and motivation mindset philosophy at Siddhant School of Yoga',
      reversed: true,
    },
    {
      badge: 'Unconditional Belonging',
      title: 'Family Environment with Full Support',
      subtitle: 'You enter as an international seeker, and you graduate as lifelong family.',
      description:
        'Stepping into a foreign land can be intimidating. At our ashram, you are welcomed with warmth, dignity, and personal care. We deliberately maintain intimate batch sizes to ensure each student receives individualized adjustments, personal mentorship with Acharya Siddhant, and wholesome sattvic meals cooked fresh three times daily.',
      points: [
        'Intimate batch sizes for dedicated one-on-one attention',
        'Organic, freshly prepared Ayurvedic meals and herbal teas',
        'Safe, nurturing sanctuary with 24/7 student care and lifelong community',
      ],
      icon: Home,
      image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80',
      alt: 'Warm family-like ashram environment at Siddhant School of Yoga Rishikesh',
      reversed: false,
    },
  ];

  return (
    <section id="unique" className="py-20 lg:py-28 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accentLight/40 text-primary font-semibold text-xs tracking-wider uppercase mb-3">
            Our Distinct Identity
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-textDark tracking-tight mb-4">
            What Makes Us Unique
          </h2>
          <p className="font-body text-textMuted text-base sm:text-lg">
            Experience an authentic yogic sanctuary that transcends conventional teacher training through depth, devotion, and life-changing philosophy.
          </p>
        </div>

        {/* Alternating Zig-Zag Rows */}
        <div className="space-y-20 lg:space-y-28">
          {uniqueFeatures.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  item.reversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text Content */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    item.reversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-accent/30 text-primary text-xs font-semibold">
                    <IconComp className="w-4 h-4 text-accent" />
                    <span>{item.badge}</span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-textDark leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-accent italic text-base sm:text-lg text-primary font-medium">
                    {item.subtitle}
                  </p>

                  <p className="font-body text-textMuted text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  <div className="pt-2 space-y-3">
                    {item.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accentLight/60 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm sm:text-base font-body text-textDark font-medium">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Container */}
                <div
                  className={`lg:col-span-6 ${
                    item.reversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative mx-auto max-w-lg lg:max-w-none">
                    {/* Decorative back-layer */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-accentLight/40 to-primaryHover/20 rounded-3xl -rotate-2 transform group-hover:rotate-0 transition-transform -z-10" />
                    
                    <div className="relative h-80 sm:h-96 lg:h-[420px] w-full rounded-2xl overflow-hidden shadow-xl border-2 border-card">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
