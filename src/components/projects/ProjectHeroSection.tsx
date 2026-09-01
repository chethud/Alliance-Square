"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import { ApprovalBadge } from "@/components/projects/ApprovalBadge";
import { YouTubeShortEmbed } from "@/components/projects/YouTubeShortEmbed";
import { getShortEmbedSize } from "@/lib/short-embed-size";
import type { ApprovalType } from "@/types";

interface ProjectHeroSectionProps {
  name: string;
  approvals: ApprovalType[];
  locationArea: string;
  locationCity: string;
  priceLabel: string;
  tagline: string;
  brochureUrl: string;
  plotSizes: string[];
  heroImage: string;
  youtubeShortId?: string;
}

export function ProjectHeroSection({
  name,
  approvals,
  locationArea,
  locationCity,
  priceLabel,
  tagline,
  brochureUrl,
  plotSizes,
  heroImage,
  youtubeShortId,
}: ProjectHeroSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number>();
  const [mediaWidth, setMediaWidth] = useState<number>();
  const [useWideFrame, setUseWideFrame] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const updateViewport = () => setUseWideFrame(mq.matches);
    updateViewport();
    mq.addEventListener("change", updateViewport);
    return () => mq.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const media = mediaRef.current;
    if (!card || !media) return;

    const update = () => {
      setCardHeight(card.getBoundingClientRect().height);
      setMediaWidth(media.getBoundingClientRect().width);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(card);
    observer.observe(media);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const mediaSize = getShortEmbedSize(cardHeight, useWideFrame ? mediaWidth : undefined);

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
      <div className="max-w-3xl lg:col-span-7">
        <div
          ref={cardRef}
          className="flex min-h-[500px] flex-col rounded-2xl border border-white/10 bg-white/95 p-8 shadow-premium backdrop-blur-xl md:min-h-[540px] md:p-12 lg:min-h-[560px]"
        >
          <ApprovalBadge approvals={approvals} />
          <h1 className="heading-section mt-6">{name}</h1>
          <p className="mt-3 flex items-center gap-2 text-cool-gray">
            <MapPin className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
            {locationArea}, {locationCity}
          </p>
          <p className="mt-4 text-2xl font-bold text-charcoal">{priceLabel}</p>
          <div className="mt-4">
            <h2 className="text-lg font-bold text-charcoal">Available Plot Sizes</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {plotSizes.map((size) => (
                <span
                  key={size}
                  className="rounded-full border border-light-gray bg-white px-5 py-2.5 text-sm font-semibold text-charcoal shadow-subtle"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 flex-1 text-body">{tagline}</p>
          <a
            href={brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-8 inline-flex w-full sm:mt-auto sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Brochure
          </a>
        </div>
      </div>

      <div
        ref={mediaRef}
        className="flex min-h-[500px] w-full justify-center md:min-h-[540px] lg:col-span-5 lg:min-h-[560px] lg:items-stretch lg:justify-end"
      >
        {youtubeShortId ? (
          <YouTubeShortEmbed
            videoId={youtubeShortId}
            title={`${name} project video`}
            height={cardHeight}
            width={mediaSize.width}
            fillScale={mediaSize.scale}
          />
        ) : (
          <div
            className="relative mx-auto overflow-hidden rounded-2xl border border-light-gray/80 bg-white shadow-subtle"
            style={{
              height: mediaSize.height,
              width: mediaSize.width,
            }}
          >
            <Image
              src={heroImage}
              alt={`${name} layout`}
              fill
              className="object-cover object-center hero-image-clarity"
              sizes="(max-width: 1024px) 100vw, 440px"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
