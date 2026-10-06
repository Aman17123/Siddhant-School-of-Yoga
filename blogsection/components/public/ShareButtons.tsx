"use client";

import { useState } from "react";

interface Props {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `https://sanskritiyogpeeth.org/blog/${slug}`;

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    title + " - " + url
  )}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  return (
    <div className="relative flex items-center gap-2.5 pt-1">
      {/* WhatsApp - Brand Green */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-[#25D366] text-white shadow-xs hover:bg-[#20ba59] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <svg
          className="w-5 h-5 fill-current"
          viewBox="0 0 448 512"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>

      {/* Facebook - Brand Blue */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-xs hover:bg-[#166fe5] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg
          className="w-4.5 h-4.5 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* X (formerly Twitter) - Brand Black */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-black text-white shadow-xs hover:bg-neutral-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        title="Share on X"
        aria-label="Share on X"
      >
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Copy Link - Sanskriti Brand Magenta */}
      <button
        type="button"
        onClick={handleCopy}
        className={`w-10 h-10 inline-flex items-center justify-center rounded-xl text-white shadow-xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer ${
          copied
            ? "bg-emerald-600 hover:bg-emerald-700 scale-105"
            : "bg-[#BF296A] hover:bg-[#951248]"
        }`}
        title={copied ? "Link Copied!" : "Copy Link"}
        aria-label="Copy link to article"
      >
        {copied ? (
          <svg
            className="w-4.5 h-4.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            className="w-4.5 h-4.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>

      {/* "Copied!" Floating Tooltip */}
      {copied && (
        <span className="absolute -top-7 left-[142px] transform -translate-x-1/2 bg-gray-900 text-white text-label font-medium px-2 py-0.5 rounded shadow-sm pointer-events-none">
          Copied!
        </span>
      )}
    </div>
  );
}
