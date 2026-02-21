import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

export const cardVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const ServiceCard = ({ title, description, icon, slug }) => {
    return (
        <MotionLink
            to={`/servicios/${slug}`}
            variants={cardVariants}
            whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.15)",
                transition: { duration: 0.4, ease: "easeOut" }
            }}
            className="group relative bg-white p-10 rounded-2xl shadow-sm transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden block"
        >
            {/* Fondo sutil en hover (Nivel 2) */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-emerald-50 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                    <div className="text-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                        {icon}
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{description}</p>
            </div>

            {/* Línea inferior animada (Nivel 2) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </MotionLink>
    );
};

export default ServiceCard;
