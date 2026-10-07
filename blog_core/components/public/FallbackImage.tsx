"use client";

import React, { useState, useEffect } from "react";

interface FallbackImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "/blog/images/yoga-and-meditation-retreat-riverside.jpg";

export default function FallbackImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt = "",
  className,
  ...props
}: FallbackImageProps) {
  const resolvedSrc = typeof src === "string" && src.trim() ? src : fallbackSrc;
  const [imgSrc, setImgSrc] = useState<string>(resolvedSrc);
  const [failedCount, setFailedCount] = useState<number>(0);

  useEffect(() => {
    setImgSrc(typeof src === "string" && src.trim() ? src : fallbackSrc);
    setFailedCount(0);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (failedCount === 0 && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setFailedCount(1);
    } else if (failedCount === 1) {
      // Secondary fallback to root images directory
      setImgSrc("/images/yoga-and-meditation-retreat-riverside.jpg");
      setFailedCount(2);
    } else if (failedCount === 2) {
      // Absolute fallback to brand logo
      setImgSrc("/logo/siddhant-logo.svg");
      setFailedCount(3);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
