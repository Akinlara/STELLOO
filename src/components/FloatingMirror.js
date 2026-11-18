import { useRef, useCallback } from 'react';
import './FloatingMirror.css';

/**
 * FloatingMirror
 * Shows an image as a glass-framed card that hovers above a glossy floor,
 * with a live mirror reflection underneath. The card tilts toward the
 * pointer and a light sheen follows it. Motion is disabled for users who
 * prefer reduced motion.
 */
export default function FloatingMirror({ src, alt = '', title, subtitle, maxTilt = 10 }) {
  const sceneRef = useRef(null);
  const frame = useRef(0);

  const setVars = useCallback((x, y) => {
    const el = sceneRef.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--ry', `${(x - 0.5) * 2 * maxTilt}deg`);
      el.style.setProperty('--rx', `${(0.5 - y) * 2 * maxTilt}deg`);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    });
  }, [maxTilt]);

  const onPointerMove = (e) => {
    const r = sceneRef.current.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - r.top) / r.height, 0), 1);
    setVars(x, y);
  };

  const onPointerLeave = () => setVars(0.5, 0.35);

  return (
    <section className="fm-stage">
      <div
        className="fm-scene"
        ref={sceneRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="fm-float">
          <figure className="fm-card">
            <img src={src} alt={alt} draggable="false" />
            <span className="fm-sheen" aria-hidden="true" />
            <span className="fm-edge" aria-hidden="true" />
          </figure>
        </div>

        <div className="fm-shadow" aria-hidden="true" />

        <div className="fm-reflection" aria-hidden="true">
          <div className="fm-card fm-card--mirror">
            <img src={src} alt="" draggable="false" />
          </div>
        </div>
      </div>

      {(title || subtitle) && (
        <header className="fm-caption">
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
        </header>
      )}
    </section>
  );
}
