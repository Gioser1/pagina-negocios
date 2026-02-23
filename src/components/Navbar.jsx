import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/navData";
import ProcessModal from "./ProcessModal";

const NavLink = ({ to, children }) => (
    <Link to={to} className="relative text-gray-300 hover:text-primary transition-colors py-2 group font-medium">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
);

const Navbar = () => {
    const [openProcess, setOpenProcess] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        // Si bajamos más de 150px y estamos haciendo scroll hacia abajo, ocultamos
        if (latest > 150 && latest > previous) {
            setHidden(true);
            setOpenProcess(false); // Cierra menú móvil por precaución
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg transition-colors duration-500 ${scrolled ? "bg-[#0a0a0a]/75 border-b border-white/5 py-0 shadow-2xl" : "bg-transparent border-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "h-14" : "h-20"}`}>
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-bold tracking-tighter text-white">Agencia<span className="text-primary">.</span></span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} to={link.path}>{link.title}</NavLink>
                        ))}
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
