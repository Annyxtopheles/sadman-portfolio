import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  routeKey: string;
  children: React.ReactNode;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const PageTransition: React.FC<Props> = ({ routeKey, children }) => (
  <motion.div
    key={routeKey}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.28, ease: EASE }}
    style={{ willChange: 'opacity, transform' }}
  >
    {children}
  </motion.div>
);
