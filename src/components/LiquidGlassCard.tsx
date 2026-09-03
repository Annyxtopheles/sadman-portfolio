import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  expandable?: boolean;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  shadowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: string;
  glowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  translucentBg?: string;
  [key: string]: unknown;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = '',
  draggable = false,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = 'xl',
  borderRadius = '16px',
  glowIntensity = 'sm',
  shadowIntensity = 'md',
  translucentBg = 'bg-[#0A0A0A]/30',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = (e: React.MouseEvent) => {
    if (!expandable) return;
    const target = e.target as HTMLElement;
    if (target.closest('a, button, input, select, textarea')) return;
    setIsExpanded(!isExpanded);
  };

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const shadowStyles: Record<string, string> = {
    none: 'inset 0 0 0 0 rgba(255, 255, 255, 0)',
    xs: 'inset 1px 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.05)',
    sm: 'inset 1px 1px 2px 0 rgba(255, 255, 255, 0.15), inset -1px -1px 2px 0 rgba(255, 255, 255, 0.08)',
    md: 'inset 1px 1px 2px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 2px 0 rgba(255, 255, 255, 0.1)',
    lg: 'inset 2px 2px 4px 0 rgba(255, 255, 255, 0.25), inset -2px -2px 4px 0 rgba(255, 255, 255, 0.12)',
    xl: 'inset 3px 3px 6px 0 rgba(255, 255, 255, 0.3), inset -3px -3px 6px 0 rgba(255, 255, 255, 0.15)',
  };

  const glowStyles: Record<string, string> = {
    none: '0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)',
    xs: '0 4px 12px rgba(0, 0, 0, 0.25), 0 0 16px rgba(255, 255, 255, 0.03)',
    sm: '0 4px 20px rgba(0, 0, 0, 0.35), 0 0 24px rgba(255, 255, 255, 0.05)',
    md: '0 6px 24px rgba(0, 0, 0, 0.45), 0 0 32px rgba(255, 255, 255, 0.07)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.55), 0 0 40px rgba(255, 255, 255, 0.1)',
    xl: '0 12px 48px rgba(0, 0, 0, 0.65), 0 0 48px rgba(255, 255, 255, 0.12)',
  };

  const containerVariants = expandable
    ? {
        collapsed: {
          width: width || 'auto',
          height: height || 'auto',
          transition: {
            duration: 0.4,
            ease: [0.5, 1.5, 0.5, 1],
          },
        },
        expanded: {
          width: expandedWidth || 'auto',
          height: expandedHeight || 'auto',
          transition: {
            duration: 0.4,
            ease: [0.5, 1.5, 0.5, 1],
          },
        },
      }
    : undefined;

  const MotionComponent = draggable || expandable ? motion.div : 'div';

  const motionProps =
    draggable || expandable
      ? {
          variants: containerVariants,
          animate: expandable ? (isExpanded ? 'expanded' : 'collapsed') : undefined,
          onClick: expandable ? handleToggleExpansion : undefined,
          drag: draggable,
          dragConstraints: draggable ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined,
          dragElastic: draggable ? 0.3 : undefined,
          whileDrag: draggable ? { scale: 1.02 } : undefined,
          whileHover: { scale: 1.005 },
        }
      : {};

  return (
    <>
      <MotionComponent
        className={cn(
          `relative overflow-hidden ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${expandable ? 'cursor-pointer' : ''}`,
          className
        )}
        style={{
          borderRadius,
          ...(width && !expandable && { width }),
          ...(height && !expandable && { height }),
        }}
        {...motionProps}
        {...props}
      >
        {/* Bend Layer (Translucent backdrop blur) */}
        <div
          className={`absolute inset-0 ${blurClasses[blurIntensity]} ${translucentBg} z-0 pointer-events-none`}
          style={{
            borderRadius,
          }}
        />

        {/* Grain Texture Overlay */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            borderRadius,
          }}
        />

        {/* Top Edge Specular Sheen */}
        <div
          className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"
        />

        {/* Face Layer (Soft Shadow and Glow) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            borderRadius,
            boxShadow: glowStyles[glowIntensity || 'sm'],
          }}
        />

        {/* Edge Layer (Inner subtle highlight) */}
        <div
          className="absolute inset-0 z-20 pointer-events-none border border-[#FFFFFF]/10"
          style={{
            borderRadius,
            boxShadow: shadowStyles[shadowIntensity || 'xs'],
          }}
        />

        {/* Content */}
        <div className={cn('relative z-30')}>{children}</div>
      </MotionComponent>
    </>
  );
};

export default LiquidGlassCard;
