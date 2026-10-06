/**
 * Real-time Blog SEO Score Calculator (0 - 100)
 * Evaluates on-page SEO signals, content depth, readability, keywords, media, and structured data.
 */

export interface SeoCheck {
  id: string;
  category: "title" | "meta" | "content" | "media" | "schema" | "extra";
  label: string;
  passed: boolean;
  score: number;
  maxScore: number;
  hint: string;
}

export interface SeoAnalysisInput {
  title?: string;
  slug?: string;
  content?: string;
  short_description?: string;
  meta_title?: string;
  meta_description?: string;
  focus_keyword?: string;
  related_keywords?: string;
  featured_image?: string;
  featured_image_alt?: string;
  faqs?: Array<{ q?: string; a?: string; question?: string; answer?: string; id?: string }> | string;
  tags?: string[] | string;
  tldr?: string;
  key_takeaways?: string;
  schema_type?: string;
  canonical_url?: string;
}

export interface SeoAnalysisResult {
  score: number; // 0 - 100
  checks: SeoCheck[];
  status: "good" | "ok" | "poor";
  statusText: string;
  color: string;
  wordCount: number;
  readingTimeMinutes: number;
  keywordDensity: number;
  passedCount: number;
  totalChecks: number;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanKeyword(kw: string): string {
  return (kw || "").trim().toLowerCase();
}

function containsWordOrPhrase(text: string, phrase: string): boolean {
  if (!text || !phrase) return false;
  const t = text.toLowerCase();
  const p = phrase.toLowerCase().trim();
  if (!p) return false;
  return t.includes(p);
}

export function calculateSeoScore(input: SeoAnalysisInput): SeoAnalysisResult {
  const title = (input.title || "").trim();
  const slug = (input.slug || "").trim();
  const metaTitle = (input.meta_title || "").trim();
  const effectiveTitle = metaTitle || title;
  const metaDesc = (input.meta_description || input.short_description || "").trim();
  const focusKw = cleanKeyword(input.focus_keyword || "");
  const relatedKw = (input.related_keywords || "").toLowerCase();
  const contentHtml = input.content || "";
  const plainContent = stripHtml(contentHtml);

  // Word count & Read time
  const wordsArray = plainContent ? plainContent.split(/\s+/).filter(Boolean) : [];
  const wordCount = wordsArray.length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 220));

  // Keyword density
  let keywordOccurrences = 0;
  if (focusKw && wordCount > 0) {
    const re = new RegExp(`\\b${focusKw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    const matches = plainContent.match(re);
    keywordOccurrences = matches ? matches.length : 0;
  }
  const keywordDensity = wordCount > 0 && keywordOccurrences > 0
    ? Number(((keywordOccurrences / wordCount) * 100).toFixed(1))
    : 0;

  // Intro content (first ~120 words)
  const introText = wordsArray.slice(0, 120).join(" ");

  // Headings
  const headingMatches = contentHtml.match(/<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi) || [];
  const headingsText = headingMatches.map(h => stripHtml(h)).join(" ");

  // FAQs count
  let faqList: Array<{ q?: string; a?: string; question?: string; answer?: string }> = [];
  if (Array.isArray(input.faqs)) {
    faqList = input.faqs;
  } else if (typeof input.faqs === "string" && input.faqs.trim()) {
    try {
      faqList = JSON.parse(input.faqs);
    } catch {
      faqList = [];
    }
  }

  // Tags count
  let tagsList: string[] = [];
  if (Array.isArray(input.tags)) {
    tagsList = input.tags;
  } else if (typeof input.tags === "string" && input.tags.trim()) {
    tagsList = input.tags.split(",").map(t => t.trim()).filter(Boolean);
  }

  const checks: SeoCheck[] = [];

  // ================= 1. TITLE CHECKS (15 PTS) =================
  const kwInTitle = Boolean(focusKw && containsWordOrPhrase(effectiveTitle, focusKw));
  checks.push({
    id: "title-keyword",
    category: "title",
    label: "Focus keyword in Title",
    passed: kwInTitle,
    score: kwInTitle ? 10 : 0,
    maxScore: 10,
    hint: kwInTitle
      ? "Title contains your focus keyword."
      : focusKw
      ? `Add "${focusKw}" to your post or SEO title.`
      : "Enter a focus keyword to evaluate title optimization.",
  });

  const titleLength = effectiveTitle.length;
  const isTitleLengthIdeal = titleLength >= 35 && titleLength <= 65;
  checks.push({
    id: "title-length",
    category: "title",
    label: "Title length (40–60 characters)",
    passed: isTitleLengthIdeal,
    score: isTitleLengthIdeal ? 5 : 0,
    maxScore: 5,
    hint:
      titleLength === 0
        ? "Add a post title."
        : titleLength < 35
        ? `Title is ${titleLength} characters. Aim for 40–60 characters for maximum CTR.`
        : titleLength > 65
        ? `Title is ${titleLength} characters and may get truncated in Google SERPs.`
        : `Great title length (${titleLength} characters).`,
  });

  // ================= 2. SLUG / URL (5 PTS) =================
  const slugClean = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const focusKwSlug = focusKw.replace(/[^a-z0-9]+/g, "-");
  const kwInSlug = Boolean(focusKw && (slugClean.includes(focusKwSlug) || containsWordOrPhrase(slugClean.replace(/-/g, " "), focusKw)));
  checks.push({
    id: "slug-keyword",
    category: "title",
    label: "Focus keyword in URL slug",
    passed: kwInSlug,
    score: kwInSlug ? 5 : 0,
    maxScore: 5,
    hint: kwInSlug
      ? "URL slug contains the focus keyword."
      : "Include your primary keyword in the permalink slug.",
  });

  // ================= 3. META DESCRIPTION (15 PTS) =================
  const kwInMeta = Boolean(focusKw && containsWordOrPhrase(metaDesc, focusKw));
  checks.push({
    id: "meta-keyword",
    category: "meta",
    label: "Focus keyword in Meta description",
    passed: kwInMeta,
    score: kwInMeta ? 10 : 0,
    maxScore: 10,
    hint: kwInMeta
      ? "Meta description includes the focus keyword."
      : "Add the focus keyword to your meta description.",
  });

  const metaLength = metaDesc.length;
  const isMetaLengthIdeal = metaLength >= 110 && metaLength <= 165;
  checks.push({
    id: "meta-length",
    category: "meta",
    label: "Meta description length (120–160 chars)",
    passed: isMetaLengthIdeal,
    score: isMetaLengthIdeal ? 5 : 0,
    maxScore: 5,
    hint:
      metaLength === 0
        ? "Write a meta description for search snippets."
        : metaLength < 110
        ? `Meta description is short (${metaLength} chars). Expand to 120–160 chars.`
        : metaLength > 165
        ? `Meta description is ${metaLength} chars. Google will truncate text past ~160 chars.`
        : `Ideal description length (${metaLength} chars).`,
  });

  // ================= 4. CONTENT & READABILITY (30 PTS) =================
  let wordCountScore = 0;
  if (wordCount >= 1000) wordCountScore = 15;
  else if (wordCount >= 600) wordCountScore = 10;
  else if (wordCount >= 300) wordCountScore = 5;

  checks.push({
    id: "content-length",
    category: "content",
    label: "Content depth (600–1000+ words)",
    passed: wordCount >= 600,
    score: wordCountScore,
    maxScore: 15,
    hint:
      wordCount >= 1000
        ? `Comprehensive length (${wordCount} words). Full +15 points awarded.`
        : wordCount >= 600
        ? `Good length (${wordCount} words). Aim for 1000+ for competitive ranking (+10 pts).`
        : wordCount >= 300
        ? `Moderate length (${wordCount} words). Minimum recommended is 600 words (+5 pts).`
        : `Only ${wordCount} words. Thin content struggle to rank on Google.`,
  });

  const kwInIntro = Boolean(focusKw && containsWordOrPhrase(introText, focusKw));
  checks.push({
    id: "content-intro",
    category: "content",
    label: "Focus keyword in first paragraph / intro",
    passed: kwInIntro,
    score: kwInIntro ? 5 : 0,
    maxScore: 5,
    hint: kwInIntro
      ? "Focus keyword appears early in the opening intro."
      : "Mention your main keyword in the first 100 words.",
  });

  const hasHeadings = headingMatches.length >= 2;
  checks.push({
    id: "content-headings",
    category: "content",
    label: "Structured with H2 / H3 subheadings",
    passed: hasHeadings,
    score: hasHeadings ? 5 : 0,
    maxScore: 5,
    hint: hasHeadings
      ? `Article contains ${headingMatches.length} subheadings.`
      : "Break up text with at least 2 H2 or H3 subheadings.",
  });

  const kwInHeadings = Boolean(
    focusKw && (containsWordOrPhrase(headingsText, focusKw) || (relatedKw && containsWordOrPhrase(headingsText, relatedKw)))
  );
  checks.push({
    id: "content-heading-kw",
    category: "content",
    label: "Keyword in H2 / H3 subheadings",
    passed: kwInHeadings,
    score: kwInHeadings ? 5 : 0,
    maxScore: 5,
    hint: kwInHeadings
      ? "Subheadings contain the focus or related keyword."
      : "Use your focus keyword or related keyword in at least one H2 subheading.",
  });

  // ================= 5. MEDIA & ALT TEXT (10 PTS) =================
  const hasFeaturedImage = Boolean(input.featured_image && input.featured_image.trim());
  checks.push({
    id: "media-featured",
    category: "media",
    label: "Featured banner image set",
    passed: hasFeaturedImage,
    score: hasFeaturedImage ? 5 : 0,
    maxScore: 5,
    hint: hasFeaturedImage
      ? "Featured image is uploaded."
      : "Upload an eye-catching featured banner image.",
  });

  const altText = (input.featured_image_alt || "").trim();
  const hasAltText = altText.length >= 5;
  checks.push({
    id: "media-alt",
    category: "media",
    label: "Image Alt text for accessibility & SEO",
    passed: hasAltText,
    score: hasAltText ? 5 : 0,
    maxScore: 5,
    hint: hasAltText
      ? `Image alt text configured ("${altText.slice(0, 30)}...").`
      : "Add descriptive alt text to the featured image.",
  });

  const faqCount = faqList.filter(
    (f) => ((f.q || f.question) || "").trim() && ((f.a || f.answer) || "").trim()
  ).length;
  const faqScore = faqCount >= 2 ? 10 : faqCount === 1 ? 5 : 0;
  checks.push({
    id: "schema-faqs",
    category: "schema",
    label: "FAQs for Google FAQ Rich Snippets",
    passed: faqCount >= 2,
    score: faqScore,
    maxScore: 10,
    hint:
      faqCount >= 2
        ? `${faqCount} FAQs added (eligible for Google FAQ snippet accordion).`
        : faqCount === 1
        ? "1 FAQ added. Add at least 1 more for full rich snippet scoring."
        : "Add 2+ FAQs under the FAQs tab for Google rich snippets.",
  });

  const hasSchemaOrCanon = Boolean(input.schema_type || input.canonical_url);
  checks.push({
    id: "schema-type",
    category: "schema",
    label: "Schema markup & Canonical URL",
    passed: hasSchemaOrCanon,
    score: hasSchemaOrCanon ? 5 : 0,
    maxScore: 5,
    hint: hasSchemaOrCanon
      ? "Schema markup configuration is active."
      : "Specify Schema Type (e.g. Article) or Canonical URL in the Schema tab.",
  });

  // ================= 7. SUMMARY & TAGS (10 PTS) =================
  const hasSummary = Boolean((input.tldr || "").trim() || (input.key_takeaways || "").trim() || (input.short_description || "").trim());
  checks.push({
    id: "extra-summary",
    category: "extra",
    label: "TL;DR or Key Takeaways summary",
    passed: hasSummary,
    score: hasSummary ? 5 : 0,
    maxScore: 5,
    hint: hasSummary
      ? "Key takeaways / TL;DR provided for readers."
      : "Add a quick TL;DR or Key Takeaways in the AI/Summary tab.",
  });

  const hasTags = tagsList.length >= 2 || Boolean((input.related_keywords || "").trim());
  checks.push({
    id: "extra-tags",
    category: "extra",
    label: "Topic tags & related keywords",
    passed: hasTags,
    score: hasTags ? 5 : 0,
    maxScore: 5,
    hint: hasTags
      ? `Topic tags defined (${tagsList.length} tags).`
      : "Add at least 2 topic tags or related keywords.",
  });

  // Calculate Total Score
  const totalScore = Math.min(100, Math.max(0, checks.reduce((acc, c) => acc + c.score, 0)));
  const passedCount = checks.filter(c => c.passed).length;

  let status: "good" | "ok" | "poor" = "poor";
  let statusText = "Needs Work";
  let color = "#BF296A"; // Red

  if (totalScore >= 80) {
    status = "good";
    statusText = "Excellent (Rank-Ready)";
    color = "#00897b"; // Teal / Green
  } else if (totalScore >= 55) {
    status = "ok";
    statusText = "Average (Improve Suggestions)";
    color = "#C9862A"; // Amber
  }

  return {
    score: totalScore,
    checks,
    status,
    statusText,
    color,
    wordCount,
    readingTimeMinutes,
    keywordDensity,
    passedCount,
    totalChecks: checks.length,
  };
}
