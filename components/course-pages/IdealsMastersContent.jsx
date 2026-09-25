import Image from "next/image";
import { Container, Kicker, HeadingDivider } from "@/components/ui";

const masters = [
  {
    name: "Sri Ramana Maharshi",
    image: "/images/ideals/ramana-maharshi.webp",
    bio: "Bhagavan Sri Ramana Maharshi is regarded by many as one of the most influential and important spiritual figures in the world of the twentieth century. A self-realized master who got enlightened at the age of seventeen taught the very essence of the non-dualistic nature of existence (Advaita-Vedanta). He was symbolic of the value he stressed of silence as a tool to reach a higher potential in life. In his presence and also after he left his body, people got realized by the sheer vibration of silence he anchored in his illustrious Sri Ramana Ashram in Tiruvannamalai. We at Siddhant School of Yoga, take his lessons of self-inquiry by silence as one of the core principles to growth.",
  },
  {
    name: "Swami Sivananda",
    image: "/images/ideals/swami-sivananda.webp",
    bio: "Be Good, Do Good, Be Kind, Be Compassionate. Serve, Love, Give, Purify, Meditate and Realise. This was the prime teaching of Swami Sivananda which still vibrates in the workings and belief of any man who has ever got an inch of his teachings. His academy for Yoga and Vedanta Studies, hospitals and other establishments provide free service for people from all walks of life without discrimination, with compassion. Siddhant School of Yoga acknowledges Swami Sivananda and his relentless effort to uplift society from the root level by the path of action or Karma Yoga. We idolize him as an omnipresent figure of socially responsible consciousness. We are inspired to serve.",
  },
  {
    name: "Swami Vivekananda",
    image: "/images/ideals/swami-vivekananda.webp",
    bio: "Swami Vivekananda, a disciple of Sri Ramakrishna is a world-renowned spiritual leader who came into the limelight when he represented Hinduism at the first World Parliament of Religions in Chicago in 1893. He is an idol for the world community for his visionary sublime leadership qualities aimed at the evolution of humanity. His aim was to spread the message of comprehensive values as a whole rather than individual development. His charitable organization Ramakrishna Mission is one of the biggest and widespread philanthropic establishment in the world. Siddhant School of Yoga deeply respects this master for his outstanding leadership quality, taking him as the ideal for a complete leader.",
    quote: "“Take risks in your life. If you win, you can lead. If you lose, you can guide.”",
  },
  {
    name: "Swami Shashawat Ji",
    image: "/images/ideals/swamishashawat.webp",
    bio: "Swami Shashwat Ji was born in 1985 in the Dhar district of the Narmada region in Madhya Pradesh. His parents named him “Krishna.” By the grace of God, he repeatedly chanted the name of Lord Rama from the tender age of five, and started meditating for several hours every morning and evening from the age of seven or eight. From this young age his interest grew in searching for new things and in serving others. Swamiji's guru, Baba Shri Gajanandji Maharaj, greatly contributed to his spiritual practice, and Swamiji began wandering to the four corners of India in the company of saints and holy men. In 2007 he began a pilgrimage around the Narmada river, and one evening in 2008, sitting quietly under a tree on the riverbank, a bright light spread in him and all around him — an intense, death-like experience of light and sound after which he felt truly blissful, immersed in an inner stillness and profound bliss that has never left him since that day.",
  },
  {
    name: "Swami Ram Kripalu Ji Maharaj",
    image: "/images/ideals/kripalumaharaj.webp",
    bio: "His Holiness Swami Ram Kripalu Das Ji was born in Orissa on September 27, 1940. He went in search of his master at sixteen years of age. After some wanderings by way of pilgrimage he reached Uttar Kashi and thence he went to Gomukha to surrender himself at the feet of His Holiness Sri Vishnu Das Ji. After a Tapasya of about ten years in the Himalayas, he descended on a nationwide pilgrimage of the four Dhams. He later settled down at a lower height in Uttar Kashi. Uttar Kashi Ashram was washed away in Ganga floods a few years ago and now His Holiness has taken abode in Maya Kund, Rishikesh.",
  },
  {
    name: "Swami Nityananda Giri",
    image: "/images/ideals/swaminityananda.webp",
    bio: "Swami Nityanand Giri is a traditional Mahatma (Sadhu) in the Kriya Yoga tradition. He wrote a famous and beautiful book named “Kriya Yoga: The Science of Life Force.” He has been staying in Rishikesh and helping practitioners for years. His Holiness Rajahamsa Swāmī Nityānanda Giri, an acharya of the Kriya-yoga order, was born in 1961 in a remote village in Odisha State, India. He completed his post-graduation, M.Sc. in Zoology in 1983, and a Ph.D. in Cytogenetics (Genotoxicity) in 1990, and taught post-graduate and under-graduate Life Sciences students at a prestigious Indian institute from 1990 to 1996. From 1997 to 2002 he was engaged in social services related to health awareness and health services management. He was initiated to the Kriyā-yoga meditation techniques in January 1994, in the tradition of Swami Ṡrīyukteṣwarjī, and renounced all other social and family obligations in June 2002 to become a monk and begin monastic life at Rishikesh, in the Himalayas. Since September 2005 he has taught and initiated seekers into Kriyā-yoga meditation techniques in India and abroad, and since June 2008 has lived the life of a wandering monk, with monasteries in the Himalayas as his main abode.",
  },
];

export default function IdealsMastersContent() {
  return (
    <>
      {/* Intro */}
      <section className="bg-[#fdfbf7] py-14 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Kicker>Our Ideals</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                Living Masters, Living Yoga
              </h2>
              <HeadingDivider center={false} />
              <div className="space-y-4 text-sm sm:text-[15px] font-figtree text-stone-600 leading-relaxed mt-4">
                <p>
                  Spiritual masters and yogis are the base of our Indian society. Yoga is presented here in our society by some great yogis for the sake of better humanity and to have a better society. The different aspects of yoga, yoga teachers, and a yoga school cannot stand without the help of living yogis. Real yoga is very much concerned with a living yogi or a master. So yogic practices must be practiced under the guidance of a living yogi.
                </p>
                <p>
                  Siddhant School of Yoga always likes to be in touch with some living legends, spiritual masters, and great yogis to get the right information and experience to practice and teach yoga and to create yoga courses. We are in touch with many masters, but very few have allowed us to introduce them here on our website as our ideals.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/plank-pose-group-yoga-session-rishikesh.jpg"
                  alt="Siddhant School of Yoga student training session in Rishikesh, India"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Masters */}
      <section className="bg-[#f4efe6] py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
            <Kicker>Our Ideals</Kicker>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
              The Masters Who Guide Us
            </h2>
            <HeadingDivider />
          </div>

          <div className="space-y-14 sm:space-y-20">
            {masters.map((master, i) => (
              <div
                key={master.name}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#fdfbf7]">
                  <Image
                    src={master.image}
                    alt={master.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-belleza font-normal tracking-wide text-[#1c3b2b] mb-3">
                    {master.name}
                  </h3>
                  <p className="text-sm sm:text-[15px] font-figtree text-stone-600 leading-relaxed">
                    {master.bio}
                  </p>
                  {master.quote && (
                    <p className="mt-4 text-sm sm:text-[15px] font-figtree italic font-medium text-[#b85c00] border-l-2 border-[#b85c00] pl-4">
                      {master.quote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="bg-[#fdfbf7] py-14 sm:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/yoga-teacher-training-graduation-celebration-rishikesh.jpg"
                  alt="Siddhant School of Yoga student training session in Rishikesh, India"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div>
              <Kicker>Rooted in Tradition</Kicker>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-belleza font-normal tracking-wide text-[#1e2422] leading-[1.2] mb-2">
                Carrying Their Teachings Forward
              </h2>
              <HeadingDivider center={false} />
              <p className="text-sm sm:text-[15px] font-figtree text-stone-600 leading-relaxed mt-4">
                Every course we teach at Siddhant School of Yoga is shaped by the living wisdom of these masters — silence and self-inquiry, selfless service, visionary leadership, surrender, discipline, and the science of the breath. We are grateful for their guidance, and we carry their teachings forward into every class, every retreat, and every student who trains with us in Rishikesh.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
