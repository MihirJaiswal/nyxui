/**
 * Motion (Framer Motion) logo SVG.
 */
export function MotionIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Motion"
      fill="none"
      stroke="#FF0055"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Motion</title>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12l-8 -8v16l16 -16v16l-4 -4" />
      <path d="M20 12l-8 8l-4 -4" />
    </svg>
  );
}
