import WhyUsPage, { buildWhyUsMetadata } from "@/components/why-us/WhyUsPage";
import page from "@/data/why-us/pranayama-center";

export const metadata = buildWhyUsMetadata(page);

export default function Page() {
  return <WhyUsPage page={page} />;
}
