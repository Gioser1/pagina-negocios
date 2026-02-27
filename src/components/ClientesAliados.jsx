import { motion } from "framer-motion";
import { clientesData, aliadosData } from "../data/clientesData";
import { useRef, useEffect, useState } from "react";

const ClientesAliados = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const allItems = [...clientesData, ...aliadosData];
    const [containerWidth, setContainerWidth] = useState(0);
    const trackRef = useRef(null);

    useEffect(() => {
        if (trackRef.current) {
            setContainerWidth(trackRef.current.scrollWidth / 2);
        }
    }, []);

    return (
        <section className="py-16 bg-[#0a0a0a] text-white overflow-hidden">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />
                <motion.div
                    ref={trackRef}
                    className="flex w-max space-x-8"
                    animate={{ x: [-0, containerWidth ? -containerWidth : 0] }}
                    transition={{ x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 20 } }}
                >
                    {[...allItems, ...allItems].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ rotateY: 180 }}
                            className="w-40 h-40 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-primary/20 flex items-center justify-center cursor-pointer perspective-1000"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            <div className="text-center">
                                <div className="text-lg font-black text-primary">
                                    {item.initials}
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {item.name}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClientesAliados;
