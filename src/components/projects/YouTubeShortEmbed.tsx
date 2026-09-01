"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { getShortEmbedSize } from "@/lib/short-embed-size";

interface YouTubeShortEmbedProps {
  videoId: string;
  title: string;
  height?: number;
  width?: number;
  fillScale?: number;
}

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

export function YouTubeShortEmbed({
  videoId,
  title,
  height,
  width,
  fillScale = 1.35,
}: YouTubeShortEmbedProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const isInViewRef = useRef(true);
  const userPrefersMutedRef = useRef(false);
  const mutedFallbackAppliedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const resumeShortPlayback = useCallback(
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
      videoId,
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        autoplay: 1,
        mute: 0,
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

          if (isInViewRef.current) {
            startPlayback(event.target, true);
          }

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
            tryEnableSound(player);
          }, 1800);
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
  }, [startPlayback, syncMuteState, tryEnableSound, videoId]);

  useEffect(() => {
    if (!isReady || !shellRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = playerRef.current;
        const visible = entry.isIntersecting;
        isInViewRef.current = visible;

        if (!player) return;

        if (visible) {
          resumeShortPlayback(player);
        } else {
          player.pauseVideo();
          isPlayingRef.current = false;
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(shellRef.current);
    return () => observer.disconnect();
  }, [isReady, resumeShortPlayback]);

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
      if (player) tryEnableSound(player);
    };

    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
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

  const hasMeasuredHeight = Boolean(height && height > 0);
  const sizedStyle = hasMeasuredHeight
    ? { height, width: width ?? getShortEmbedSize(height).width }
    : undefined;

  return (
    <div
      className={cn(
        "relative shrink-0",
        !hasMeasuredHeight && "mx-auto h-[420px] w-[315px] sm:h-[440px] sm:w-[330px]"
      )}
      style={sizedStyle}
    >
      <div
        ref={shellRef}
        className="project-short-shell relative h-full w-full overflow-hidden rounded-2xl border border-light-gray/80 shadow-premium"
        style={{ ["--short-fill-scale" as string]: fillScale }}
        aria-label={title}
      >
        <div ref={playerContainerRef} className="project-short-player" />
        {!isPlaying && (
          <div
            className="absolute inset-0 z-[1] flex items-center justify-center bg-charcoal/[0.04]"
            aria-hidden="true"
          >
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-cyan/25 border-t-brand-cyan" />
          </div>
        )}
        <div
          className="project-short-blocker absolute inset-0 z-[2]"
          aria-hidden="true"
          onClick={(event) => event.preventDefault()}
          onPointerDown={(event) => event.preventDefault()}
        />
      </div>

      <button
        type="button"
        onClick={toggleMute}
        disabled={!isReady}
        className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-dark/55 text-white backdrop-blur-sm transition-colors hover:bg-dark/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan disabled:cursor-not-allowed disabled:opacity-40"
        aria-label={isMuted ? `Unmute ${title}` : `Mute ${title}`}
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
