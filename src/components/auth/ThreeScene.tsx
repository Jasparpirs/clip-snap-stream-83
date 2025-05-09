
import { motion } from 'framer-motion';

export default function ThreeScene() {
  return (
    <motion.div
      className="w-full h-[300px] bg-gradient-to-b from-black to-purple-950 rounded-lg overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Snipster</h1>
        <p className="text-lg text-white/80">Your ultimate video platform</p>
      </div>
    </motion.div>
  );
}
