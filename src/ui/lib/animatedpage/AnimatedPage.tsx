import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const animations = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export const AnimatedPage: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
