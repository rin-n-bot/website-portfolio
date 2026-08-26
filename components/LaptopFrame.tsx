'use client';

import { ReactNode } from 'react';

export interface LaptopFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * LaptopFrame
 * Wraps `children` in a MacBook-style screen mockup: black bezel, top notch
 * camera, and a laptop base/hinge beneath the screen.
 */

const LaptopFrame = ({ children, className = '' }: LaptopFrameProps) => {
  return (
    <div
      className={`relative w-full mx-auto ${className}`}
      style={
        {
          '--macbook-bezel': '6px',
          '--macbook-bezel-top': '6px',
          '--macbook-radius': '10px'
        } as React.CSSProperties
      }
    >
      {/* Screen + bezel */}
      <div
        className="relative bg-gray-900"
        style={{
          borderTopLeftRadius: 'var(--macbook-radius)',
          borderTopRightRadius: 'var(--macbook-radius)',
          paddingTop: 'var(--macbook-bezel-top)',
          paddingLeft: 'var(--macbook-bezel)',
          paddingRight: 'var(--macbook-bezel)',
          paddingBottom: 0
        }}
      >

        {/* Screen content area */}
        <div className="relative overflow-hidden rounded-sm">
          <div className="relative">{children}</div>
        </div>
      </div>

      {/* Chin / lower bezel strip */}
      <div
        className="relative bg-gray-900 flex items-center justify-center"
        style={{ paddingTop: 'var(--macbook-bezel)', paddingBottom: 4 }}
      >
      </div>

      {/* Laptop base / hinge */}
      <div className="relative mx-[-3%] h-4 rounded-b-xl bg-linear-to-b from-[#e2e2e2] to-[#b8b8b8] shadow-[0_10px_20px_-6px_rgba(0,0,0,0.45)]">
        <div className="mx-auto h-1.5 w-28 rounded-b-lg bg-black/10" />
      </div>
      {/* Contact shadow on the surface behind the laptop */}
      <div className="mx-auto mt-2 h-3 w-[70%] rounded-full bg-black/20 blur-xl" />
    </div>
  );
};

export default LaptopFrame;