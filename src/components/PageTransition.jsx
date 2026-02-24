import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
    return (
        <>
            {/* The page content wrapper */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
            >
                {children}
            </motion.div>

            {/* Slide-In Overlay Effect */}
            <motion.div
                className="fixed top-0 left-0 w-full h-screen bg-primary z-[99998] origin-bottom"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Secondary Color Overlay */}
            <motion.div
                className="fixed top-0 left-0 w-full h-screen bg-secondary z-[99997] origin-bottom"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
        </>
    );
};

export default PageTransition;
