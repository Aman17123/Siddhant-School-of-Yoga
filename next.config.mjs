/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old slugs that were renamed (not just ".php" stripped) when pages were rebuilt.
      { source: "/yoga-for-beginners-rishikesh", destination: "/yoga-course-for-beginners-in-rishikesh-india", permanent: true },
      { source: "/yoga-for-beginners-rishikesh.php", destination: "/yoga-course-for-beginners-in-rishikesh-india", permanent: true },
      { source: "/yoga-meditation-retreat", destination: "/yoga-meditation-retreat-in-rishikesh-india", permanent: true },
      { source: "/yoga-meditation-retreat.php", destination: "/yoga-meditation-retreat-in-rishikesh-india", permanent: true },
      { source: "/7-day-yoga-meditation-retreat", destination: "/07-days-yoga-meditation-retreat-in-rishikesh-india", permanent: true },
      { source: "/7-day-yoga-meditation-retreat.php", destination: "/07-days-yoga-meditation-retreat-in-rishikesh-india", permanent: true },
      { source: "/kundalini-retreat-rishikesh", destination: "/kundalini-retreat-in-rishikesh-india", permanent: true },
      { source: "/kundalini-retreat-rishikesh.php", destination: "/kundalini-retreat-in-rishikesh-india", permanent: true },
      { source: "/pranayama-retreat-rishikesh.php", destination: "/pranayama-retreat-rishikesh-india", permanent: true },
      { source: "/vipassana-retreat-rishikesh.php", destination: "/vipassana-retreat-rishikesh-india", permanent: true },
      { source: "/detox-retreat-rishikesh.php", destination: "/detox-retreat-rishikesh-india", permanent: true },
      { source: "/3-day-detox-retreat", destination: "/3-days-detox-retreat-rishikesh-india", permanent: true },
      { source: "/3-day-detox-retreat.php", destination: "/3-days-detox-retreat-rishikesh-india", permanent: true },
      { source: "/mantra-yoga-meditation-retreat.php", destination: "/mantra-yoga-meditation-retreat-rishikesh", permanent: true },
      { source: "/yoga-ayurveda-retreat", destination: "/yoga-and-ayurveda-retreat-in-rishikesh", permanent: true },
      { source: "/yoga-ayurveda-retreat.php", destination: "/yoga-and-ayurveda-retreat-in-rishikesh", permanent: true },
      { source: "/5-day-meditation-pranayama-retreat", destination: "/05-days-meditation-pranayama-retreat-in-rishikesh", permanent: true },
      { source: "/5-day-meditation-pranayama-retreat.php", destination: "/05-days-meditation-pranayama-retreat-in-rishikesh", permanent: true },
      { source: "/300-hour-yoga-ttc-rishikesh.php", destination: "/300-hour-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/500-hour-yoga-ttc-rishikesh.php", destination: "/500-hour-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/online-200-hour-yoga-ttc", destination: "/online-200-hour-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/online-200-hour-yoga-ttc.php", destination: "/online-200-hour-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/500-hour-yoga-ayurveda-ttc", destination: "/500-hour-yoga-ayurveda-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/500-hour-yoga-ayurveda-ttc.php", destination: "/500-hour-yoga-ayurveda-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/100-hour-kundalini-yoga-ttc", destination: "/100-hours-kundalini-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/100-hour-kundalini-yoga-ttc.php", destination: "/100-hours-kundalini-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/200-hour-kundalini-yoga-ttc", destination: "/200-hours-kundalini-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/200-hour-kundalini-yoga-ttc.php", destination: "/200-hours-kundalini-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/300-hour-kundalini-yoga-ttc", destination: "/300-hours-kundalini-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/300-hour-kundalini-yoga-ttc.php", destination: "/300-hours-kundalini-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/500-hour-kundalini-yoga-ttc", destination: "/500-hours-kundalini-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/500-hour-kundalini-yoga-ttc.php", destination: "/500-hours-kundalini-yoga-teacher-training-in-rishikesh-india", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us.php", destination: "/contact", permanent: true },

      // Generic fallback: any other old "*.php" URL that has an exact same-name
      // page today (e.g. 100-hour-yoga-teacher-training-in-rishikesh-india.php)
      // just gets the ".php" stripped.
      { source: "/:slug.php", destination: "/:slug", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
