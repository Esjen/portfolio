import { useSyncExternalStore } from "react";

/**
 * One switch for every moving part of the site (stars, clouds, typing line).
 * It lives on <html data-bg-paused="true"> so CSS and components can both read it.
 */
const ATTRIBUTE = "data-bg-paused";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [ATTRIBUTE],
  });
  return () => observer.disconnect();
}

const getSnapshot = () =>
  document.documentElement.getAttribute(ATTRIBUTE) === "true";

export default function useAnimationsPaused() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function setAnimationsPaused(paused: boolean) {
  document.documentElement.setAttribute(ATTRIBUTE, String(paused));
}
