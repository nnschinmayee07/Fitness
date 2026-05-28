import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

export type MotionButtonProps = HTMLMotionProps<'button'> & {
  /**
   * Determines whether the button uses the primary (solid) style or the secondary (border) style.
   * Default is "primary".
   */
  variant?: 'primary' | 'secondary';
  /** Additional class names to apply (will be merged with the button style). */
  className?: string;
};

/**
 * MotionButton – a reusable button component that provides subtle Framer Motion hover/tap
 * animations while respecting the project's design system (primary‑btn / secondary‑btn). It
 * works across desktop and mobile and can be used anywhere a button is needed.
 *
 * Example usage:
 *   <MotionButton onClick={handle} variant="primary">Start Tracking</MotionButton>
 */
export const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  ...rest
}) => {
  const baseClass = variant === 'primary' ? 'primary-btn' : 'secondary-btn';
  const mergedClass = `${baseClass} ${className}`.trim();
  return (
    <motion.button
      className={mergedClass}
      whileHover={whileHover}
      whileTap={whileTap}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
