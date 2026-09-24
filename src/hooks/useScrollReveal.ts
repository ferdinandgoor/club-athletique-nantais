import { useEffect, type RefObject } from 'react';

// Les éléments restent visibles sans JavaScript ou sans IntersectionObserver.
export function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = root.current;
    if (!container || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const stop = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const start = () => {
      stop();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          observer?.unobserve(target);
          if (target.contains(document.activeElement) || !('animate' in target)) return;
          const animation = target.animate(
            [{ opacity: 0.25, translate: '0 18px' }, { opacity: 1, translate: '0 0' }],
            { duration: 650, easing: 'cubic-bezier(.22, 1, .36, 1)' },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: 0.08 });
      container.querySelectorAll('[data-reveal]').forEach((element) => observer?.observe(element));
    };
    // Un lien atteint au clavier doit être immédiatement lisible.
    container.addEventListener('focusin', stop);
    preference.addEventListener('change', start);
    start();
    return () => {
      stop();
      container.removeEventListener('focusin', stop);
      preference.removeEventListener('change', start);
    };
  }, [root]);
}
