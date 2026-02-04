import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 1088;

export function useIsMobile(BREAKPOINT = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
