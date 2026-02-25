import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProcessModal from "./ProcessModal";
import { servicesData } from "../data/servicesData";

const NavLink = ({ to, children }) => {
    const handleClick = (e) => {
        if ((to.startsWith('/#') || to.startsWith('#')) && window.location.pathname === '/') {
            e.preventDefault();
            const id = to.replace('/#', '').replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Optional: update URL hash without scrolling jump
                window.history.pushState(null, '', `/#${id}`);
            }
        }
    };

    return (
        <Link to={to} onClick={handleClick} className="relative text-gray-300 hover:text-primary transition-colors py-2 group font-medium">
            {children}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>
    );
};

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
        hidden: { opacity: 0, y: 15, pointerEvents: 'none' },
        visible: {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
                duration: 0.3,
                ease: "easeOut"
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
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
                            <NavLink to="#Descubre">
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
                                        // Menú más ancho para acomodar 2 columnas
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-4 origin-top"
                                    >
                                        <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-x-6 gap-y-2 relative overflow-hidden">
                                            {/* Efecto de brillo de fondo para el menú */}
                                            <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                            {servicesData.map((service) => (
                                                <motion.div
                                                    variants={itemVariants}
                                                    key={service.slug}
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    className="relative"
                                                >
                                                    <Link to={`/services/${service.slug}`} className="flex items-center gap-4 p-3 rounded-xl text-gray-300 transition-all duration-300 group overflow-hidden relative" onClick={() => setIsServicesMenuOpen(false)}>

                                                        {/* Fondo brillante suave al pasar el mouse */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                                                        {/* Borde indicativo izquierdo que crece */}
                                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-3/4 transition-all duration-300 ease-out rounded-r-full shadow-[0_0_10px_rgba(2,223,130,0.8)]" />

                                                        <div className="bg-white/5 p-2.5 rounded-lg group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(2,223,130,0.4)] group-hover:-rotate-6 transition-all duration-300 relative z-10 border border-transparent group-hover:border-primary/30">
                                                            {service.icon}
                                                        </div>
                                                        <div className="flex flex-col relative z-10">
                                                            <span className="font-medium text-[15px] text-white/90 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300 drop-shadow-sm">{service.title}</span>
                                                        </div>
                                                    </Link>
                                                </motion.div>
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
                        <NavLink to="/#about">
                            <span className="flex items-center gap-1.5">
                                Quiénes somos
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
