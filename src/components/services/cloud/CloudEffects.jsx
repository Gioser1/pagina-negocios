import { useRef, memo } from "react";
import { motion } from "framer-motion";

// --- REMOVED HEAVY ANIMATIONS (FloatingNodes, DataStream) ---

export const MagneticButton = ({ children, onClick, className }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.button>
    );
};

export const BackgroundBlobs = memo(() => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020202]">
        <div
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] opacity-20"
            style={{
                background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
                filter: 'blur(80px)'
            }}
        />
        <div
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-20"
            style={{
                background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.1) 0%, transparent 70%)',
                filter: 'blur(100px)'
            }}
        />
    </div>
));
