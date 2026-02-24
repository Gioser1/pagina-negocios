import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProcessModal from "./ProcessModal";
import { servicesData } from "../data/servicesData";

const NavLink = ({ to, children }) => (
    <Link to={to} className="relative text-gray-300 hover:text-primary transition-colors py-2 group font-medium">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
);

const Navbar = () => {
    const [openProcess, setOpenProcess] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    const dropdownVariants = {
        hidden: { opacity: 0, y: 10, pointerEvents: 'none' },
        visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-colors duration-500 ${scrolled ? "bg-[#0a0a0a]/75 border-b border-white/5 py-0 shadow-2xl" : "bg-transparent border-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "h-14" : "h-20"}`}>
                    <Link to="/" className="relative group flex-shrink-0 flex items-center overflow-hidden">
                        <img src={`${import.meta.env.BASE_URL}imagenes/Logos/olimpologo.png`} alt="Logo Agencia" className={`w-auto transition-all duration-500 group-hover:scale-105 ${scrolled ? 'h-10' : 'h-16'}`} />
                        {/* Efecto de brillo automático */}
                        <motion.span
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: "linear",
                                repeatDelay: 5
                            }}
                        />
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsServicesMenuOpen(true)}
                            onMouseLeave={() => setIsServicesMenuOpen(false)}
                        >
                            <NavLink to="#services">
                                <span className="flex items-center gap-1.5">
                                    Nuestros Servicios
                                    <motion.div
                                        animate={{ rotate: isServicesMenuOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={16} className="mt-0.5" />
                                    </motion.div>
                                </span>
                            </NavLink>
                            <AnimatePresence>
                                {isServicesMenuOpen && (
                                    <motion.div
                                        variants={dropdownVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        // Se elimina el margen y se añade un padding para crear un "puente" invisible
                                        // que mantiene el hover activo al mover el cursor hacia el menú.
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4"
                                    >
                                        <div className="bg-[#111111] border border-white/10 rounded-lg shadow-2xl p-2 flex flex-col gap-1">
                                            {servicesData.map((service) => (
                                                <Link key={service.slug} to="#services" className="flex items-center gap-3 p-3 rounded-md text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors duration-200" onClick={() => setIsServicesMenuOpen(false)}>
                                                    {service.icon}
                                                    <span className="font-medium text-sm">{service.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <NavLink to="#">
                            <span className="flex items-center gap-1.5">
                                Lo que pensamos
                                <ChevronDown size={16} className="mt-0.5" />
                            </span>
                        </NavLink>
                        <NavLink to="#">
                            <span className="flex items-center gap-1.5">
                                Quienes somos
                                <ChevronDown size={16} className="mt-0.5" />
                            </span>
                        </NavLink>
                        <NavLink to="#">
                            <span className="flex items-center gap-1.5">
                                Empleo
                                <ChevronDown size={16} className="mt-0.5" />
                            </span>
                        </NavLink>
                    </div>

                    <div className="flex items-center">
                        <button onClick={() => setOpenProcess(true)} className="text-white p-2">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {openProcess && (
                <ProcessModal onClose={() => setOpenProcess(false)} />
            )}
        </motion.nav>
    );
};

export default Navbar;
