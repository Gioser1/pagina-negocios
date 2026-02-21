import { motion } from "framer-motion";

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gray-50 dark:bg-dark-900 transition-colors duration-500"></div>

            {/* Orb 1: Primary Green */}
            <motion.div
                className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[100px]"
                animate={{
                    x: ["0%", "20%", "-20%", "0%"],
                    y: ["0%", "30%", "-10%", "0%"],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.33, 0.66, 1],
                }}
                style={{ top: "10%", left: "20%" }}
            />

            {/* Orb 2: Dark Blue 100 */}
            <motion.div
                className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-dark-100/20 rounded-full blur-[100px] md:blur-[120px]"
                animate={{
                    x: ["-20%", "30%", "0%", "-20%"],
                    y: ["-10%", "-40%", "20%", "-10%"],
                    scale: [0.9, 1.1, 1, 0.9],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.33, 0.66, 1],
                }}
                style={{ top: "40%", right: "10%" }}
            />

            {/* Orb 3: Dark Green 200 */}
            <motion.div
                className="absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-dark-200/20 rounded-full blur-[60px] md:blur-[80px]"
                animate={{
                    x: ["10%", "-30%", "20%", "10%"],
                    y: ["20%", "0%", "-30%", "20%"],
                    scale: [1.1, 0.9, 1.2, 1.1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.33, 0.66, 1],
                }}
                style={{ bottom: "-10%", left: "40%" }}
            />
        </div>
    );
};

export default AnimatedBackground;
