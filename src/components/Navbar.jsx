import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/navData";

const NavLink = ({ to, children }) => (
    <Link to={to} className="relative text-gray-300 hover:text-primary transition-colors py-2 group font-medium">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detección de scroll para navbar dinámica (Nivel 2)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "bg-dark-900/80 backdrop-blur-md border-b border-white/10 py-0" : "bg-transparent border-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-bold tracking-tighter text-white">Agencia<span className="text-primary">.</span></span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} to={link.path}>{link.title}</NavLink>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-500 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/20 duration-300"
                        >
                            Empezar
                        </motion.button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={{
                            open: { opacity: 1, height: "auto", transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                            closed: { opacity: 0, height: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                        }}
                        className="md:hidden bg-dark-900 border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {navLinks.map((link, index) => (
                                <motion.div key={index} variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } }}>
                                    <Link onClick={() => setIsOpen(false)} to={link.path} className="block px-3 py-3 text-gray-300 hover:text-primary font-medium rounded-lg hover:bg-white/5">{link.title}</Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
