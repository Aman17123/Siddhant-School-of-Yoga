import WhyUsPage, { buildWhyUsMetadata } from "@/components/why-us/WhyUsPage";
import page from "@/data/why-us/community-environment";

export const metadata = buildWhyUsMetadata(page);

export default function Page() {
  return <WhyUsPage page={page} />;
}
