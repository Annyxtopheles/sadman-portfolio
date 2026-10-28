import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortalCtaButtonProps {
  className?: string;
}

export const PortalCtaButton: React.FC<PortalCtaButtonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative rounded-full transition-all duration-300 ease-out group-hover:scale-[1.03] hover:!scale-105 active:scale-95",
        className
      )}
    >
      {/* Ambient atmospheric cyan halo on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#38BDF8]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Button Body with Dynamic Color Inversion & Clean Hover Sheen */}
      <div
        className={cn(
          "relative px-6 py-2.5 rounded-full font-mono text-xs lowercase transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md select-none overflow-hidden",
          // Idle state: calm, semi-translucent cosmic obsidian pill matching current colors
          "bg-[#060A10]/80 text-[#E0F2FE]/85 border border-[#38BDF8]/30 shadow-[0_2px_12px_rgba(0,0,0,0.5)]",
          // Hover state: luminous pearl-white pill with dark typography and soft cyan glow
          "group-hover:bg-[#F8FAFC] group-hover:text-[#060A10] group-hover:border-[#BAE6FD] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
        )}
      >
        {/* Clean, elegant light sheen sweep across the glass on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
        />

        <span className="relative z-10 tracking-tight font-medium transition-colors duration-300">
          enter personal archive
        </span>

        {/* Arrow: normally points right, on hover pivots to top-right corner */}
        <ArrowRight
          aria-hidden="true"
          className="relative z-10 w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:-rotate-45"
        />
      </div>
    </div>
  );
};

export default PortalCtaButton;
