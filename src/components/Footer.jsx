import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react";
import { navLinks, legalLinks } from "../data/navData";

const Footer = () => {
    return (
        <footer id="Descubre" className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Sutil glow superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col gap-12 md:gap-8 mb-16">
                    {/* Sección de Contacto (Izquierda) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col space-y-4"
                    >
                        <div className="flex items-center space-x-3 group">
                            <MapPin className="w-5 h-5 text-primary group-hover:text-emerald-400 transition-colors" />
                            <span className="text-gray-200 font-medium tracking-wide">Calle 19 # 57-20, Guayabal, Medellín</span>
                        </div>
                        <div className="flex items-center space-x-3 group">
                            <Mail className="w-5 h-5 text-primary group-hover:text-emerald-400 transition-colors" />
                            <a href="mailto:contactenos@olimpo-empresa.com" className="text-gray-200 font-medium tracking-wide hover:text-white transition-colors">
                                contactenos@olimpo-empresa.com
                            </a>
                        </div>
                        <div className="flex items-center space-x-3 group">
                            <Phone className="w-5 h-5 text-primary group-hover:text-emerald-400 transition-colors" />
                            <a href="tel:+573025627200" className="text-gray-200 font-medium tracking-wide hover:text-white transition-colors">
                                +57 302 562 7200
                            </a>
                        </div>
                    </motion.div>

                    {/* Redes y Logo (Centro) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="flex flex-col items-start md:items-center w-full md:w-auto"
                    >
                        <div className="flex space-x-4">
                            <motion.a
                                whileHover={{ y: -5, backgroundColor: "#02DF82", color: "#0a192f" }}
                                transition={{ duration: 0.2 }}
                                href="https://www.facebook.com/people/Olimpo-Innova/61587587151310/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">Facebook</span>
                                <Facebook className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5, backgroundColor: "#02DF82", color: "#0a192f" }}
                                transition={{ duration: 0.2 }}
                                href="https://www.instagram.com/olimpoinnova/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">Instagram</span>
                                <Instagram className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5, backgroundColor: "#02DF82", color: "#0a192f" }}
                                transition={{ duration: 0.2 }}
                                href="https://linkedin.com/company/olimpo-innova/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Enlaces de Navegación y Legal (Derecha) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="grid grid-cols-2 gap-8 md:flex md:flex-row md:space-x-24 w-full md:w-auto"
                    >
                        <div>
                            <h4 className="text-sm tracking-wider uppercase font-semibold mb-6 text-gray-400">Navegación</h4>
                            <ul className="space-y-4">
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path} className="text-gray-400 text-sm hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-300">{link.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm tracking-wider uppercase font-semibold mb-6 text-gray-400">Legal</h4>
                            <ul className="space-y-4">
                                {legalLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.path} className="text-gray-400 text-sm hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-300">{link.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Slogan Centrado */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
                        <span className="text-primary">Tecnología</span> que inspira, <span className="text-primary">Soluciones</span> que transforman.
                    </h2>
                </motion.div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/10 flex justify-center items-center">
                    <p className="text-gray-300 text-sm font-medium tracking-wide text-center">
                        &copy; 2026 Olimpo Innova SAS. Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
