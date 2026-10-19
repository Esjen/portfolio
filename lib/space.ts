/**
 * Drawing logic for the dark-mode "space" background.
 *
 * Kept free of React and the DOM so the same code can be tested by rendering
 * it to an image. SpaceBackground.tsx handles the canvas lifecycle.
 *
 * Two ideas make it more than a plain starfield:
 *  - Depth: every star has a depth, and stars with more depth move faster
 *    when the page scrolls, so the sky has parallax.
 *  - Constellation: a small group of brighter "node" stars are joined by thin
 *    lines, like the nodes and edges in a workflow graph (my AutoFlow AI project).
 */

export interface SkyColors {
  /** Warm white used for most stars. */
  warm: string;
  /** Cool blue-white used for some stars. */
  cool: string;
  /** Constellation line colour as an "r g b" triplet, e.g. "170 190 235". */
  line: string;
}

interface Star {
  /** Position as a fraction of the canvas, so resizing needs no regeneration. */
  x: number;
  y: number;
  radius: number;
  /** 0 to 1. Higher depth scrolls faster (parallax). */
  depth: number;
  /** Base brightness, 0 to 1. */
  alpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  cool: boolean;
  /** Brighter stars that the constellation lines connect. */
  node: boolean;
}

export interface Sky {
  stars: Star[];
  /** Pairs of indexes into `stars` that are joined by a line. */
  edges: [number, number][];
}

export interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  startedAt: number;
}

const PARALLAX = 0.18;
const NODE_DEPTH = 0.9;
const GLOW_RADIUS = 1.45;
const SHOOTING_STAR_MS = 900;
const TAIL_LENGTH = 150;

const random = (min: number, max: number) => min + Math.random() * (max - min);

/** Wraps a value into the range [0, size). */
const wrap = (value: number, size: number) => ((value % size) + size) % size;

/** More stars on bigger screens, within sensible limits for phones and 4K. */
export function starCountFor(width: number, height: number): number {
  return Math.round(Math.min(340, Math.max(90, (width * height) / 5000)));
}

export function createSky(width: number, height: number): Sky {
  const count = starCountFor(width, height);
  const nodeCount = Math.max(14, Math.round(count * 0.14));

  const stars: Star[] = Array.from({ length: count }, (_, index) => {
    const node = index < nodeCount;

    return {
      x: Math.random(),
      y: Math.random(),
      radius: node ? random(1.3, 2.1) : random(0.45, 1.5),
      depth: node ? NODE_DEPTH : random(0.1, 0.6),
      alpha: node ? random(0.85, 1) : random(0.45, 1),
      twinklePhase: random(0, Math.PI * 2),
      twinkleSpeed: random(0.6, 2.2),
      cool: Math.random() < 0.3,
      node,
    };
  });

  const sky: Sky = { stars, edges: [] };
  linkConstellation(sky, width);
  return sky;
}

/**
 * Joins each node star to its one or two nearest neighbours. Recomputed when
 * the canvas width changes, because "near" is measured in pixels.
 */
export function linkConstellation(sky: Sky, width: number, height = width) {
  const maxDistance = Math.min(230, Math.max(110, width * 0.18));
  const nodes = sky.stars
    .map((star, index) => ({ star, index }))
    .filter(({ star }) => star.node);

  const seen = new Set<string>();
  sky.edges = [];

  for (const a of nodes) {
    const nearest = nodes
      .filter((b) => b.index !== a.index)
      .map((b) => ({
        index: b.index,
        distance: Math.hypot(
          (a.star.x - b.star.x) * width,
          (a.star.y - b.star.y) * height
        ),
      }))
      .filter((b) => b.distance <= maxDistance)
      .sort((p, q) => p.distance - q.distance)
      .slice(0, 2);

    for (const b of nearest) {
      const key = a.index < b.index ? `${a.index}-${b.index}` : `${b.index}-${a.index}`;
      if (!seen.has(key)) {
        seen.add(key);
        sky.edges.push([a.index, b.index]);
      }
    }
  }
}

export function spawnShootingStar(
  width: number,
  height: number,
  now: number
): ShootingStar {
  const goingRight = Math.random() < 0.5;
  const speed = random(0.8, 1.1); // pixels per millisecond
  const angle = random(0.45, 0.7); // radians below horizontal

  return {
    x: random(width * 0.1, width * 0.9),
    y: random(0, height * 0.45),
    vx: Math.cos(angle) * speed * (goingRight ? 1 : -1),
    vy: Math.sin(angle) * speed,
    startedAt: now,
  };
}

export function isShootingStarDone(star: ShootingStar, now: number) {
  return now - star.startedAt > SHOOTING_STAR_MS;
}

export function drawShootingStar(
  ctx: CanvasRenderingContext2D,
  star: ShootingStar,
  now: number,
  colors: SkyColors
) {
  const elapsed = now - star.startedAt;
  const progress = elapsed / SHOOTING_STAR_MS;
  // Fade in quickly, fade out slowly.
  const fade = Math.min(1, progress * 6) * (1 - progress);

  const headX = star.x + star.vx * elapsed;
  const headY = star.y + star.vy * elapsed;
  const length = Math.hypot(star.vx, star.vy);
  const tailX = headX - (star.vx / length) * TAIL_LENGTH;
  const tailY = headY - (star.vy / length) * TAIL_LENGTH;

  const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
  gradient.addColorStop(0, `rgba(${colors.line.replace(/ /g, ",")},0)`);
  gradient.addColorStop(1, colors.warm);

  ctx.save();
  ctx.globalAlpha = fade * 0.9;
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1.3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(headX, headY);
  ctx.stroke();
  ctx.restore();
}

export interface DrawOptions {
  width: number;
  height: number;
  /** Milliseconds, used for twinkling. */
  time: number;
  /** window.scrollY, used for parallax. */
  scroll: number;
  /** False draws one still frame (for people who prefer reduced motion). */
  animate: boolean;
  colors: SkyColors;
}

export function drawSky(ctx: CanvasRenderingContext2D, sky: Sky, options: DrawOptions) {
  const { width, height, time, scroll, animate, colors } = options;

  ctx.clearRect(0, 0, width, height);

  const positions = sky.stars.map((star) => ({
    x: star.x * width,
    y: wrap(star.y * height - (animate ? scroll * star.depth * PARALLAX : 0), height),
  }));

  // Constellation lines first, so the stars sit on top of them.
  const maxSpan = Math.min(230, Math.max(110, width * 0.18)) * 1.5;
  ctx.lineWidth = 0.7;
  for (const [a, b] of sky.edges) {
    const from = positions[a];
    const to = positions[b];
    // A star that wrapped around the edge would draw a line across the screen.
    if (Math.abs(from.y - to.y) > maxSpan) continue;

    const distance = Math.hypot(from.x - to.x, from.y - to.y);
    const strength = Math.max(0, 1 - distance / maxSpan);
    ctx.strokeStyle = `rgba(${colors.line.replace(/ /g, ",")},${(0.12 + strength * 0.16).toFixed(3)})`;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  sky.stars.forEach((star, index) => {
    const twinkle = animate
      ? 0.65 + 0.35 * Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase)
      : 1;

    const color = star.cool ? colors.cool : colors.warm;

    ctx.globalAlpha = star.alpha * twinkle;
    ctx.fillStyle = color;
    // The largest stars get a soft glow.
    ctx.shadowColor = color;
    ctx.shadowBlur = star.radius > GLOW_RADIUS ? 9 : 0;
    ctx.beginPath();
    ctx.arc(positions[index].x, positions[index].y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
}
