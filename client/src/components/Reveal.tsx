import { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children, delay = 0, className = "" }: PropsWithChildren<{ delay?: number; className?: string }>) {
  const shouldReduceMotion = useReducedMotion();
  return <motion.div className={className} initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }} whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : delay, ease: [0.23, 1, 0.32, 1] }}>{children}</motion.div>;
}
