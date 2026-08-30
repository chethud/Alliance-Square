const HERO_VIDEO_ID = "KWV_2LWONlw";

const heroVideoSrc = `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&showinfo=0&enablejsapi=1`;

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <iframe
            src={heroVideoSrc}
            title="Alliance Square Properties hero video"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-dark/85 via-dark/60 to-dark/30" />
        <div className="absolute inset-0 bg-mesh-dark opacity-50" />
      </div>
    </section>
  );
}
