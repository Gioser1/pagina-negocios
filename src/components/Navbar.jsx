import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProcessModal from "./ProcessModal";
import ServicesModal from "./ServicesModal";
import { servicesData } from "../data/servicesData";

const NavLink = ({ to, children }) => {
    const handleClick = (e) => {
        if ((to.startsWith('/#') || to.startsWith('#')) && window.location.pathname === '/') {
            e.preventDefault();
            const id = to.replace('/#', '').replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
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
    const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Estados para ocultar/mostrar el navbar
    const [hidden, setHidden] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const { scrollY } = useScroll();
    const location = useLocation();
    const isHomeOrServicePage = location.pathname === '/' || location.pathname.startsWith('/services/');

    // Escuchar cuando se abre/cierra el calendario
    useEffect(() => {
        const handleCalendarChange = (e) => {
            setIsCalendarOpen(e.detail.isOpen);
        };
        window.addEventListener('calendarStateChange', handleCalendarChange);
        return () => window.removeEventListener('calendarStateChange', handleCalendarChange);
    }, []);

    // Bloquear el scroll del fondo cuando el menú móvil está abierto
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();

        // Determinar si hay scroll (para efectos de fondo/tamaño)
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        // Si estamos hasta arriba, no ocultar
        if (latest <= 100) {
            setHidden(false);
            return;
        }

        // Si scrolleamos hacia abajo y no hay un modal abierto activo que requiera el navbar, ocultar
        if (latest > previous && previous > 100) {
            setHidden(true);
        } else {
            // Si scrolleamos hacia arriba, mostrar
            setHidden(false);
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
        <>
            {/* Zona invisible para detectar hover en la parte superior cuando el navbar está oculto */}
            <div
                className={`fixed top-0 left-0 w-full h-8 z-[60] ${isHovering || !hidden ? 'pointer-events-none' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            />

            <motion.nav
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ y: 0 }}
                animate={{ y: hidden && !isHovering ? "-100%" : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-colors duration-500 ${scrolled ? "bg-[#0a0a0a]/75 border-b border-white/5 py-0 shadow-2xl" : "bg-transparent border-transparent py-2 md:py-3"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "h-14" : "h-16 md:h-16"}`}>
                        <Link to="/" className="relative group flex-shrink-0 flex items-center overflow-hidden">
                            <img src={`${import.meta.env.BASE_URL}imagenes/Logos/olimpologo.png`} alt="Logo Agencia" className={`w-auto transition-all duration-500 group-hover:scale-105 ${scrolled ? 'h-10' : 'h-12 md:h-14'}`} />
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

                        <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                            <div
                                className="relative"
                                onMouseEnter={() => setIsServicesMenuOpen(true)}
                                onMouseLeave={() => setIsServicesMenuOpen(false)}
                            >
                                <div className="relative text-gray-300 hover:text-primary transition-colors py-2 group font-medium cursor-pointer">
                                    <span className="flex items-center gap-1.5 text-sm xl:text-base">
                                        Nuestros Servicios
                                        <motion.div
                                            animate={{ rotate: isServicesMenuOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown size={16} className="mt-0.5" />
                                        </motion.div>
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                </div>
                                <AnimatePresence>
                                    {isServicesMenuOpen && (
                                        <motion.div
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            // Menú más ancho para acomodar 2 columnas, respetando pantalla lg
                                            className="absolute top-full left-1/2 -translate-x-1/2 w-max max-w-[600px] pt-4 origin-top"
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
                                                        className="relative min-w-[250px]"
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
                                                                <span className="font-medium text-[15px] xl:text-base text-white/90 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300 drop-shadow-sm">{service.title}</span>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <NavLink to="/#identidad">
                                <span className="flex items-center gap-1.5 text-sm xl:text-base whitespace-nowrap">
                                    Lo que pensamos
                                </span>
                            </NavLink>
                            <NavLink to="/#about">
                                <span className="flex items-center gap-1.5 text-sm xl:text-base whitespace-nowrap">
                                    Quiénes somos
                                </span>
                            </NavLink>
                            <motion.button
                                onClick={() => setIsServicesModalOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="px-3 py-2 xl:px-4 xl:py-2 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-300 text-black font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(2,223,130,0.5)] text-xs xl:text-sm whitespace-nowrap"
                            >
                                Descubre lo que hacemos
                            </motion.button>
                        </div>

                        <div className="flex items-center ml-4">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setOpenProcess(true)}
                                className="text-white p-2 sm:p-2.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                            >
                                <Menu size={20} className="sm:w-6 sm:h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {openProcess && (
                    <ProcessModal onClose={() => setOpenProcess(false)} />
                )}
                {isServicesModalOpen && (
                    <ServicesModal isOpen={isServicesModalOpen} onClose={() => setIsServicesModalOpen(false)} />
                )}
            </motion.nav>

            {/* Menú Móvil Lateral (Opciones del Navbar) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[120] p-6 flex flex-col lg:hidden shadow-2xl overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-lg font-semibold text-white">Menú</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors cursor-pointer"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col space-y-6">
                                {/* Servicios Dropdown Mobile */}
                                <div className="flex flex-col space-y-3">
                                    <button
                                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                        className="flex items-center justify-between w-full text-left cursor-pointer"
                                    >
                                        <span className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Servicios</span>
                                        <motion.div
                                            animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown size={18} className="text-gray-400" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isMobileServicesOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-col pl-4 border-l border-white/10 space-y-4 pt-2 pb-2">
                                                    {servicesData.map((service) => (
                                                        <Link
                                                            key={service.slug}
                                                            to={`/services/${service.slug}`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="text-gray-300 hover:text-primary transition-colors text-base flex items-center gap-3"
                                                        >
                                                            <span className="text-primary/70">{service.icon}</span>
                                                            {service.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="w-full h-px bg-white/10 my-2" />

                                <NavLink to="/#identidad">
                                    <span onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-200 hover:text-primary transition-colors block">
                                        Lo que pensamos
                                    </span>
                                </NavLink>
                                <NavLink to="/#about">
                                    <span onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-200 hover:text-primary transition-colors block">
                                        Quiénes somos
                                    </span>
                                </NavLink>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setIsServicesModalOpen(true);
                                        }}
                                        className="w-full py-3 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-300 text-black font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(2,223,130,0.3)]"
                                    >
                                        Descubre lo que hacemos
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Botón flotante lateral para móviles cuando se oculta el navbar principal */}
            <AnimatePresence>
                {!isMobileMenuOpen && !isCalendarOpen && isHomeOrServicePage && (
                    <motion.button
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        onClick={() => {
                            setIsMobileMenuOpen(true);
                        }}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] bg-primary/20 hover:bg-primary/40 backdrop-blur-md p-3 rounded-l-2xl text-white shadow-[0_0_15px_rgba(2,223,130,0.3)] border border-r-0 border-white/10 transition-colors lg:hidden flex items-center justify-center cursor-pointer"
                    >
                        <ChevronDown size={24} className="rotate-90 text-primary" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
