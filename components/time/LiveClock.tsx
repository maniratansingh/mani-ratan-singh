"use client";

import * as React from "react";

interface LiveClockProps {
  /** `full` renders HH:MM:SS, `hm` renders HH:MM. */
  mode?: "full" | "hm";
  timeZone?: string;
  suffix?: string;
  fallback?: string;
  className?: string;
}

/**
 * Isolated clock so its per-second tick never re-renders the surrounding
 * hero/section trees. Ticks pause while the tab is hidden.
 */
export function LiveClock({
  mode = "hm",
  timeZone = "Asia/Kolkata",
  suffix = "IST",
  fallback = "IST",
  className,
}: LiveClockProps) {
  const formatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
        ...(mode === "full" ? { second: "2-digit" } : {}),
      }),
    [mode, timeZone]
  );

  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const render = () => setTime(formatter.format(new Date()));

    const start = () => {
      render();
      // Minute precision doesn't need a per-second wake-up.
      const period = mode === "full" ? 1000 : 30_000;
      intervalId = setInterval(render, period);
    };

    const stop = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = undefined;
    };

    const handleVisibility = () => {
      stop();
      if (!document.hidden) start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [formatter, mode]);

  return (
    <span className={className}>
      {time ? `${time} ${suffix}` : fallback}
    </span>
  );
}
