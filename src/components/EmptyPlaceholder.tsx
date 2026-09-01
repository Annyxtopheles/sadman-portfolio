import React from 'react';

interface EmptyPlaceholderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Skeletal-bold empty state. Dashed bordered block that echoes the bordered
 * card system used across the site so empty sections feel intentional, not broken.
 */
export const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  eyebrow,
  title,
  description,
  className = '',
}) => (
  <div
    className={`py-16 md:py-24 text-center max-w-2xl mx-auto ${className}`}
  >
    {eyebrow && (
      <div className="text-xs uppercase font-medium tracking-wider opacity-40 mb-3">
        {eyebrow}
      </div>
    )}
    <h3 className="font-scanport text-2xl md:text-3xl font-medium mb-3 tracking-tight">{title}</h3>
    {description && (
      <p className="text-sm md:text-base opacity-60 max-w-md mx-auto leading-relaxed">{description}</p>
    )}
  </div>
);
