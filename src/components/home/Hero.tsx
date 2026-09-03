"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroVideoId } from "@/data/company";

const HERO_VIDEO_ID = heroVideoId;

interface YTPlayer {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          videoId: string;
          host?: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const isInViewRef = useRef(true);
  const userPrefersMutedRef = useRef(false);
  const mutedFallbackAppliedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const syncMuteState = useCallback((player: YTPlayer) => {
    setIsMuted(player.isMuted());
  }, []);

  const tryEnableSound = useCallback(
    (player: YTPlayer) => {
      if (userPrefersMutedRef.current) return;
      player.unMute();
      syncMuteState(player);
    },
    [syncMuteState]
  );

  const startPlayback = useCallback(
    (player: YTPlayer, preferSound: boolean) => {
      if (preferSound && !userPrefersMutedRef.current) {
        player.unMute();
      } else {
        player.mute();
      }
      player.playVideo();
      syncMuteState(player);
    },
    [syncMuteState]
  );

  const resumeHeroPlayback = useCallback(
    (player: YTPlayer) => {
      player.playVideo();
      if (!userPrefersMutedRef.current) {
        tryEnableSound(player);
      }
      syncMuteState(player);
    },
    [syncMuteState, tryEnableSound]
  );

  const initPlayer = useCallback(() => {
    if (!playerContainerRef.current || playerRef.current || !window.YT?.Player) return;

    playerRef.current = new window.YT.Player(playerContainerRef.current, {
      videoId: HERO_VIDEO_ID,
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0,
        enablejsapi: 1,
        cc_load_policy: 0,
        autohide: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          setIsReady(true);

          // Start muted so mobile browsers allow autoplay, then try sound.
          if (isInViewRef.current) {
            startPlayback(event.target, false);
            window.setTimeout(() => {
              if (!userPrefersMutedRef.current && playerRef.current) {
                tryEnableSound(playerRef.current);
              }
            }, 400);
          }

          // If playback still hasn't started, force muted play.
          window.setTimeout(() => {
            const player = playerRef.current;
            if (
              !player ||
              !isInViewRef.current ||
              isPlayingRef.current ||
              mutedFallbackAppliedRef.current
            ) {
              return;
            }

            mutedFallbackAppliedRef.current = true;
            player.mute();
            player.playVideo();
            syncMuteState(player);
          }, 1200);
        },
        onStateChange: (event) => {
          const YT = window.YT;
          if (!YT) return;

          if (
            event.data === YT.PlayerState.PLAYING ||
            event.data === YT.PlayerState.BUFFERING
          ) {
            isPlayingRef.current = true;
            setIsPlaying(true);
          }

          if (event.data === YT.PlayerState.PLAYING) {
            tryEnableSound(event.target);
          }

          if (
            event.data === YT.PlayerState.PAUSED ||
            event.data === YT.PlayerState.UNSTARTED ||
            event.data === YT.PlayerState.CUED
          ) {
            isPlayingRef.current = false;
            setIsPlaying(false);
          }

          if (
            isInViewRef.current &&
            (event.data === YT.PlayerState.PAUSED ||
              event.data === YT.PlayerState.UNSTARTED ||
              event.data === YT.PlayerState.CUED)
          ) {
            event.target.playVideo();
          }

          if (event.data === YT.PlayerState.ENDED && isInViewRef.current) {
            event.target.seekTo(0, true);
            startPlayback(event.target, !userPrefersMutedRef.current);
          }
        },
      },
    });
  }, [startPlayback, syncMuteState, tryEnableSound]);

  useEffect(() => {
    if (!isPlaying || !isInViewRef.current) return;

    const player = playerRef.current;
    if (!player || userPrefersMutedRef.current) return;

    const delays = [0, 120, 350, 700, 1200];
    const timers = delays.map((delay) =>
      window.setTimeout(() => {
        if (!playerRef.current || userPrefersMutedRef.current) return;
        tryEnableSound(playerRef.current);
        playerRef.current.playVideo();
      }, delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isPlaying, tryEnableSound]);

  useEffect(() => {
    if (!isReady) return;

    const onFirstInteraction = () => {
      const player = playerRef.current;
      if (player && isInViewRef.current) {
        tryEnableSound(player);
        player.playVideo();
      }
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };
  }, [isReady, tryEnableSound]);

  useEffect(() => {
    if (playerRef.current) return;

    let cancelled = false;
    let pollId: number | undefined;

    const boot = () => {
      if (!cancelled) initPlayer();
    };

    if (window.YT?.Player) {
      initPlayer();
      return;
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      boot();
    };

    // Ensure the IFrame API script exists (layout Script can be delayed/blocked).
    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }

    pollId = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(pollId);
        boot();
      }
    }, 100);

    return () => {
      cancelled = true;
      if (pollId) window.clearInterval(pollId);
      window.onYouTubeIframeAPIReady = previousReady;
    };
  }, [initPlayer]);

  useEffect(() => {
    if (!isReady || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = playerRef.current;
        const visible = entry.isIntersecting;
        isInViewRef.current = visible;
        setIsInView(visible);

        if (!player) return;

        if (visible) {
          shellRef.current?.classList.remove("opacity-0");
          resumeHeroPlayback(player);
        } else {
          shellRef.current?.classList.add("opacity-0");
          player.pauseVideo();
          isPlayingRef.current = false;
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isReady, resumeHeroPlayback]);

  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    if (player.isMuted()) {
      userPrefersMutedRef.current = false;
      player.unMute();
      setIsMuted(false);
    } else {
      userPrefersMutedRef.current = true;
      player.mute();
      setIsMuted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative mt-[var(--site-header-height,4.0625rem)] h-[calc(100dvh-var(--site-header-height,4.0625rem))] min-h-[420px] w-full overflow-hidden bg-dark md:min-h-[480px]"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <div
          ref={shellRef}
          className={cn(
            "hero-video-shell absolute inset-0 overflow-hidden transition-opacity duration-700",
            !isReady && "opacity-0",
            !isInView && "pointer-events-none opacity-0"
          )}
          aria-hidden="true"
        >
          <div className="hero-video-frame">
            <div ref={playerContainerRef} id="hero-youtube-player" />
          </div>
        </div>

        {/* Blocks all taps from reaching the YouTube iframe */}
        <div
          className="hero-video-blocker absolute inset-0 z-[15]"
          aria-hidden="true"
          onPointerDown={(event) => {
            event.preventDefault();
            const player = playerRef.current;
            if (player) {
              tryEnableSound(player);
              player.playVideo();
            }
          }}
        />
      </div>

      <button
        type="button"
        onClick={toggleMute}
        disabled={!isReady}
        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-dark/45 text-white backdrop-blur-sm transition-colors hover:bg-dark/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-40 sm:left-6 md:bottom-8 md:left-8"
        aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Volume2 className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </section>
  );
}
