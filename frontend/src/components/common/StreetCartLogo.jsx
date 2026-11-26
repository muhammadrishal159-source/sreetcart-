import React from 'react';

/**
 * Custom geometric StreetCart brand mark in warm golden-yellow and deep charcoal.
 */
export function StreetCartLogo({ className = 'w-10 h-10' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="14" fill="url(#sc-gold-grad)" />
      <path
        d="M13 15.5H17.2L20.4 29.5C20.65 30.6 21.62 31.38 22.75 31.38H33.5C34.55 31.38 35.48 30.68 35.76 29.67L37.8 22.25C38.04 21.38 37.38 20.5 36.48 20.5H18.4"
        stroke="#1B1C19"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22.5" cy="36" r="2.2" fill="#1B1C19" />
      <circle cx="33.5" cy="36" r="2.2" fill="#1B1C19" />
      <path
        d="M27.5 11.5L29.1 14.9L32.8 15.4L30.1 18L30.7 21.7L27.5 19.9L24.3 21.7L24.9 18L22.2 15.4L25.9 14.9L27.5 11.5Z"
        fill="#FFFFFF"
        stroke="#1B1C19"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="sc-gold-grad"
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDE047" />
          <stop offset="1" stopColor="#EAB308" />
        </linearGradient>
      </defs>
    </svg>
  );
}
