"use client";

import { useState } from "react";
import {
  Plus,
  Minus,
  HelpCircle,
  Award,
  ClipboardCheck,
  FileText,
  CalendarCheck,
  Backpack,
  CreditCard,
  UtensilsCrossed,
} from "lucide-react";

const categories = [
  {
    label: "General",
    icon: HelpCircle,
    items: [
      {
        q: "Is Siddhant School of Yoga registered with Yoga Alliance?",
        a: "Yes, Siddhant School of Yoga is officially registered with Yoga Alliance USA as a Registered Yoga School (RYS 200, RYS 300, and RYS 500). Every course follows Yoga Alliance's global curriculum standards for hours, subjects, and teacher qualifications, and graduates become eligible to register as a Registered Yoga Teacher (RYT) and teach internationally.",
      },
      {
        q: "Where exactly is the school located?",
        a: "Siddhant School of Yoga is located in Veerbhadra, Rishikesh, Uttarakhand, India — a quiet residential area close to the Ganga river and the Himalayan foothills, a short distance from Laxman Jhula and Tapovan.",
      },
      {
        q: "Why is Rishikesh considered the best place for yoga teacher training?",
        a: "Rishikesh sits where the sacred Ganga meets the Himalayan foothills, and it has been a living center of yoga, meditation, and Vedic study for centuries. Training here means daily practice by the river, access to ashrams and temples, and a natural, distraction-free environment — which is why it's widely called the Yoga Capital of the World.",
      },
      {
        q: "Do I need previous yoga experience to join?",
        a: "No prior experience is required for the 100-hour course or our beginner-friendly retreats — both are designed to welcome complete newcomers step by step. From the 200-hour course onward, basic familiarity with asana and breathing practice is helpful, though our teachers still guide every student at their own level.",
      },
      {
        q: "What happens after the course ends?",
        a: "Every graduate receives a structured 100-day home practice schedule to maintain discipline and deepen their skills after leaving Rishikesh. You also stay connected with Acharya Siddhant directly, so you can ask questions about your practice or teaching career at any point during that period.",
      },
      {
        q: "What is the best time of year to train in Rishikesh?",
        a: "Batches run year-round at Siddhant School of Yoga. October to March offers the coolest, most comfortable climate for long daily practice sessions, while the quieter monsoon months (July to September) attract students who enjoy a lush, green and peaceful Rishikesh.",
      },
    ],
  },
  {
    label: "Certification",
    icon: Award,
    items: [
      {
        q: "Is Siddhant School of Yoga's certification authentic?",
        a: "Yes. Siddhant School of Yoga is an authentic, result-oriented yoga school in Rishikesh, providing high-quality yoga education that follows Yoga Alliance USA standards throughout every course.",
      },
      {
        q: "Which of your courses are Yoga Alliance certified?",
        a: "Our 200-hour and 300-hour Yoga Teacher Training Courses are certified by Yoga Alliance USA. The 500-hour TTC combines the 200-hour and 300-hour programs. After certification, graduates are eligible to teach yoga worldwide.",
      },
      {
        q: "Do I need to register with Yoga Alliance separately after certification?",
        a: "Yes. After completing your course and certification, you'll need to register with Yoga Alliance directly (around a $115 registration fee) to become an officially Registered Yoga Teacher (RYT). Yoga Alliance has over 70,000 RYTs and 30,000 Registered Yoga Schools (RYS) worldwide.",
      },
      {
        q: "Is the 100-hour Yoga TTC certified by Yoga Alliance?",
        a: "The 100-hour course is the first part of our 200-hour Yoga Teacher Training, approved by Yoga Alliance USA. On its own, it awards a Siddhant School of Yoga Certificate of Completion — to become an officially Registered Yoga Teacher (RYT 200), you'll continue with Part 2 of the 200-hour program and then register separately with Yoga Alliance.",
      },
      {
        q: "What is the difference between 100-hour and 200-hour yoga TTC?",
        a: "The 100-hour yoga TTC builds a strong personal practice foundation and ends with a course completion certificate, making it ideal for beginners. The 200-hour yoga TTC is the internationally recognised entry point for teaching professionally, ending in RYS 200 certification that qualifies you to register as a Yoga Alliance RYT-200 teacher.",
      },
      {
        q: "What is the difference between 200-hour and 300-hour yoga TTC?",
        a: "The 200-hour course is the foundational teaching certificate required before advancing further. The 300-hour course is an advanced-level program open only to already-certified 200-hour teachers, and completing both levels (500 hours total) makes you eligible for RYT 500 — the highest teaching credential recognised by Yoga Alliance worldwide.",
      },
    ],
  },
  {
    label: "Eligibility",
    icon: ClipboardCheck,
    items: [
      {
        q: "What is the eligibility criteria to join a yoga TTC?",
        a: (
          <div>
            <p className="mb-2">
              The main criterion is having the "right attitude." Beyond that, applicants should meet these conditions:
            </p>
            <ul className="space-y-1.5 pl-1">
              {[
                "Good physical condition",
                "Open-mindedness and eagerness to learn/practice yoga",
                "Dedication to practice 9–10 hours daily with 100% attendance",
                "Must be vegetarian during the course",
                "No alcohol, drugs, or smoking allowed",
                "Basic English knowledge required",
                "Age 18–60",
                "No surgery within the last year",
                "Kids are not allowed to accompany",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#158b72] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        q: "Do I need to be flexible or very fit to start a yoga TTC?",
        a: "No, you do not need to be flexible or highly fit to start. Our courses are built to meet every student at their current level and build up gradually — flexibility, strength, and stamina are outcomes the training develops over time, not requirements you need to arrive with.",
      },
      {
        q: "Is there a minimum or maximum age to join?",
        a: "Students who join our courses generally range from 18 to 60 years old, and there is no strict upper age limit — the training is adapted to each student's body, health, and prior experience rather than a fixed age requirement.",
      },
    ],
  },
  {
    label: "Documents & Visa",
    icon: FileText,
    items: [
      {
        q: "What documents do I need to bring for the course?",
        a: (
          <div>
            <p className="mb-2">You'll need to bring the following:</p>
            <ul className="space-y-1.5 pl-1">
              {[
                "Two clear color photocopies of your passport (original must also be shown)",
                "Two clear color passport-size photos",
                "Visa expiry date information",
                "A valid Indian Tourist Visa, arranged before traveling to India",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#158b72] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        q: "Do I need a visa to attend yoga training in India?",
        a: "Yes. Foreign nationals need a visa to enter India. Applicants should arrange an Indian Tourist Visa (via the embassy or a visa service) well in advance, along with health/travel insurance and banking or credit card arrangements before departure.",
      },
      {
        q: "Which visa should I apply for?",
        a: "Most international students travel to India on a Tourist e-Visa for short-term courses and retreats, which is usually sufficient for a 100 to 500-hour program. Visa rules vary by nationality and course length, so confirm the correct visa type with your local Indian embassy or consulate before booking flights.",
      },
      {
        q: "Do you offer airport pickup?",
        a: "Yes, once your seat is confirmed we arrange a pickup from Dehradun (Jolly Grant) Airport, or from Haridwar or Rishikesh Railway Station, so you can travel directly to the ashram without navigating local transport on your own.",
      },
    ],
  },
  {
    label: "Arrival Day",
    icon: CalendarCheck,
    items: [
      {
        q: "What happens on arrival and on the first day of the course?",
        a: (
          <div className="space-y-2">
            <p>
              Students may arrive one day before the course starts. On arrival, you'll check into your room, complete your application form, and pay any remaining course fees.
            </p>
            <p className="font-semibold text-[#158b72]">Day 1 schedule:</p>
            <ul className="space-y-1.5 pl-1">
              {[
                "8:00–9:00 AM — Hatha Yoga class, followed by breakfast",
                "10:30 AM — Traditional fire ceremony, group photo, distribution of study materials",
                "Lunch and rest",
                "3:00 PM — Orientation covering teachers, syllabus, rules, food, accommodation and course benefits; you meet your teachers and fellow students, discuss goals and expectations, and receive the first week's schedule",
                "Evening — Ashtanga Yoga class (official course start)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#158b72] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      },
      {
        q: "What if I miss classes or don't meet the attendance requirement?",
        a: "Since certification depends on completing the full contact-hour curriculum, close to 100% attendance is required. Missing significant class time can lead to delayed certification or required makeup sessions, so it's best to confirm your plans with us in advance if you expect to miss any sessions.",
      },
    ],
  },
  {
    label: "What to Bring",
    icon: Backpack,
    items: [
      {
        q: "What should I bring for a yoga TTC in Rishikesh?",
        a: (
          <div>
            <p className="mb-2">
              The school provides yoga education, food and accommodation. We recommend bringing:
            </p>
            <ul className="space-y-1.5 pl-1">
              {[
                "Electronics — tablet, camera, laptop, mobile phone and chargers",
                "Two passport-size photographs (for records and certificate)",
                "An ATM/debit card (for the best exchange rates)",
                "Season-appropriate and comfortable yoga clothing",
                "Shoes and a travel towel",
                "A first-aid kit and basic medications",
                "Personal items, and optionally a musical instrument or MP3 player",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#158b72] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-stone-500">
              Avoid bringing expensive jewelry or valuables, as the school isn't responsible for theft.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    label: "Fees & Booking",
    icon: CreditCard,
    items: [
      {
        q: "How much does yoga teacher training cost in Rishikesh?",
        a: "Course fees vary depending on the course length (100 to 500 hours), room type (shared, triple, or private), and season. At Siddhant School of Yoga, exact fees for each program — including accommodation and meals — are confirmed directly with Acharya Siddhant before you book, so there are no hidden charges.",
      },
      {
        q: "How do I secure my seat?",
        a: "Message the school directly by WhatsApp or email with your preferred course and batch dates. Acharya Siddhant will confirm availability, course level, and fees with you personally, and your seat is locked in once dates and payment terms are agreed in writing.",
      },
      {
        q: "Can I get a refund if I need to cancel my course?",
        a: "A partial refund is available if you cancel with sufficient advance notice before your batch start date. Full cancellation and refund terms, including deadlines and any non-refundable portion, are shared with you in writing at the time of booking.",
      },
      {
        q: "Do you offer discounts for early booking or group registration?",
        a: "Yes, we offer early bird discounts for students who book well in advance, along with group rates for friends, couples, or small groups registering together. Message us on WhatsApp for current offers, seasonal discounts, and upcoming batch dates.",
      },
      {
        q: "Can I complete yoga teacher training online instead of travelling to Rishikesh?",
        a: "Yes, an online 200-hour yoga TTC option is available for students who cannot travel to India yet, covering the same Yoga Alliance curriculum through live sessions. That said, most graduates say practising in person in Rishikesh adds a depth of experience an online course cannot fully replace.",
      },
    ],
  },
  {
    label: "Food & Stay",
    icon: UtensilsCrossed,
    items: [
      {
        q: "Is accommodation and food included in the course fee?",
        a: "Yes. Every teacher training and retreat fee at Siddhant School of Yoga includes your accommodation and three sattvic vegetarian meals a day, so there are no hidden costs to worry about.",
      },
      {
        q: "Can I choose between a private and a shared room?",
        a: "Yes, private, double share and triple share rooms are all available. Private rooms are limited and allotted on a first-come, first-served basis, so we recommend booking your seat early.",
      },
      {
        q: "What if I have dietary restrictions or allergies?",
        a: "Our kitchen is happy to accommodate vegan, gluten-free and other dietary needs. Simply inform our admissions team when you book so the kitchen can plan accordingly.",
      },
      {
        q: "Is the drinking water safe at the ashram?",
        a: "Yes. Filtered drinking water is available throughout the ashram at all times, so you never need to worry about water safety during your stay.",
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#158b72] bg-white shadow-md"
          : "border-[#c8ece2] bg-white/95 hover:border-[#158b72] shadow-2xs"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-sm sm:text-base font-belleza font-bold tracking-wide transition-colors ${
            isOpen ? "text-[#158b72]" : "text-[#1F1E1D]"
          }`}
        >
          {item.q}
        </span>
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-[#158b72] text-white"
              : "bg-[#def4ee4d] text-[#77786e] hover:bg-[#158b72]/20"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <Plus className="w-4 h-4 stroke-[2.5]" />
          )}
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-[15px] text-stone-600 leading-relaxed font-medium">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqCategoryAccordion() {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  const handleTabClick = (i) => {
    setActiveTab(i);
    setOpenIndex(0);
  };

  const activeItems = categories[activeTab].items;

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 lg:mb-10">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isActive = activeTab === i;
          return (
            <button
              key={cat.label}
              type="button"
              onClick={() => handleTabClick(i)}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-figtree font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#158b72] text-white shadow-sm"
                  : "bg-[#def4ee4d] border border-[#158b72]/30 text-[#158b72] hover:border-[#158b72]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Active Category Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {activeItems.map((item, idx) => (
          <AccordionItem
            key={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </div>
  );
}
