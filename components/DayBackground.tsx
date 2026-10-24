/**
 * Light-mode background: a sky gradient with a few slow clouds.
 * Pure CSS (see .sky and .cloud in globals.css). Shown only in light mode.
 *
 * --s = size, --dur = seconds to cross the screen, --delay = head start,
 * --x = where the cloud rests if the visitor prefers reduced motion.
 */
const clouds = [
  { top: "7%", s: 1.1, dur: 260, delay: -40, x: "62%", opacity: 0.95 },
  { top: "21%", s: 0.7, dur: 340, delay: -210, x: "82%", opacity: 0.7 },
  { top: "40%", s: 1.3, dur: 300, delay: -120, x: "-4%", opacity: 0.85 },
  { top: "58%", s: 0.9, dur: 380, delay: -300, x: "70%", opacity: 0.75 },
  { top: "74%", s: 1.2, dur: 280, delay: -90, x: "10%", opacity: 0.85 },
  { top: "89%", s: 0.8, dur: 360, delay: -250, x: "55%", opacity: 0.7 },
];

export default function DayBackground() {
  return (
    <div
      aria-hidden="true"
      className="sky pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:hidden"
    >
      {clouds.map((cloud) => (
        <div
          key={cloud.top}
          className="cloud"
          style={
            {
              top: cloud.top,
              opacity: cloud.opacity,
              "--s": cloud.s,
              "--dur": `${cloud.dur}s`,
              "--delay": `${cloud.delay}s`,
              "--x": cloud.x,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
