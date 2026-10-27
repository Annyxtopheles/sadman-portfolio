import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  routeKey: string;
  children: React.ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

let hasAppMountedOnce = false;

export const PageTransition: React.FC<Props> = ({ routeKey, children }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    hasAppMountedOnce = true;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [routeKey]);

  if (shouldReduceMotion) {
    return <div key={routeKey}>{children}</div>;
  }

  return (
    <motion.div
      key={routeKey}
      initial={hasAppMountedOnce ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.26, ease: EASE }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
};
