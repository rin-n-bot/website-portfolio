'use client';

import { ReactNode } from 'react';

export interface MobileFrameProps {
  children: ReactNode;
  className?: string;
  /** Show the dynamic-island style camera cutout at the top of the screen. Default true. */
  showIsland?: boolean;
  /** Show the home indicator bar at the bottom of the screen. Default true. */
  showHomeIndicator?: boolean;
}

/**
 * MobileFrame
 * Wraps `children` in a phone-style screen mockup: thin bezel, side
 * volume/power buttons, a top dynamic-island camera cutout, and a
 * bottom home indicator inside the screen.
 */
const MobileFrame = ({
  children,
  className = '',
  showIsland = true,
  showHomeIndicator = true
}: MobileFrameProps) => {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={
        {
          '--phone-bezel': '8px',
          '--phone-radius': '22px',
          width: '280px'
        } as React.CSSProperties
      }
    >
      {/* Side buttons */}
      <span className="absolute -left-0.5 top-24 h-6 w-0.75 rounded-l-sm bg-gray-800" aria-hidden="true" />
      <span className="absolute -left-0.5 top-32 h-10 w-0.75 rounded-l-sm bg-gray-800" aria-hidden="true" />
      <span className="absolute -left-0.5 top-44 h-10 w-0.75 rounded-l-sm bg-gray-800" aria-hidden="true" />
      <span className="absolute -right-0.5 top-28 h-14 w-0.75 rounded-r-sm bg-gray-800" aria-hidden="true" />

      {/* Body + bezel */}
      <div
        className="relative bg-gray-900 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
        style={{
          borderRadius: 'var(--phone-radius)',
          padding: 'var(--phone-bezel)'
        }}
      >
        {/* Dynamic island / camera cutout */}
        {showIsland && (
          <div className="absolute top-4 left-1/2 z-30 h-3 w-3 -translate-x-1/2 rounded-full bg-black" />
        )}

        {/* Screen content area */}
        <div
          className="relative overflow-hidden bg-black"
          style={{ borderRadius: 'calc(var(--phone-radius) - var(--phone-bezel))' }}
        >
          <div className="relative aspect-9/19.5 w-full">{children}</div>

          {/* Home indicator */}
          {showHomeIndicator && (
            <div className="absolute bottom-2 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-white/70" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;