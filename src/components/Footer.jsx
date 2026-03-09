import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react";
import Faq from "./Faq";
import ClientesAliados from "./ClientesAliados";
import Certificados from "./Certificados";

const Footer = () => {
    return (
        <footer id="Descubre" className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Sutil glow superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col gap-12 md:gap-8 mb-16">
                    {/* Certificados y Awards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full"
                    >
                        <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-12">
                            Estos <span className="text-primary">certificados</span> nos respaldan
                        </h3>
                        <Certificados />
                    </motion.div>

                    {/* FAQ */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full"
                    >
                        <Faq />
                    </motion.div>
                </div>

                {/* Clientes y Aliados */}
                <ClientesAliados />

                {/* Slogan Centrado */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center mb-16 pt-16 border-t border-white/10"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight">
                        <span className="text-primary">Tecnología</span> que inspira, <span className="text-primary">Soluciones</span> que transforman.
                    </h2>
                </motion.div>

                {/* Sección de Contacto y Redes */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-12 mb-8 border-t border-white/10 pt-12">

                    {/* Columna Izquierda: Contacto */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col space-y-4 items-center md:items-start"
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

                    {/* Columna Derecha: Redes Sociales */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-6 justify-center md:justify-end"
                    >
                        <motion.a
                            whileHover={{ y: -8, backgroundColor: "#02DF82", color: "#0a192f" }}
                            transition={{ duration: 0.2 }}
                            href="https://www.facebook.com/people/Olimpo-Innova/61587587151310/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 w-16 h-24 rounded-lg bg-white/5 text-gray-400 flex items-center justify-center transition-colors hover:text-white"
                        >
                            <Facebook className="w-8 h-8" />
                            <span className="text-xs font-medium text-gray-300">Facebook</span>
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -8, backgroundColor: "#02DF82", color: "#0a192f" }}
                            transition={{ duration: 0.2 }}
                            href="https://www.instagram.com/olimpoinnova/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 w-16 h-24 rounded-lg bg-white/5 text-gray-400 flex items-center justify-center transition-colors hover:text-white"
                        >
                            <Instagram className="w-8 h-8" />
                            <span className="text-xs font-medium text-gray-300">Instagram</span>
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -8, backgroundColor: "#02DF82", color: "#0a192f" }}
                            transition={{ duration: 0.2 }}
                            href="https://linkedin.com/company/olimpo-innova/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 w-16 h-24 rounded-lg bg-white/5 text-gray-400 flex items-center justify-center transition-colors hover:text-white"
                        >
                            <Linkedin className="w-8 h-8" />
                            <span className="text-xs font-medium text-gray-300">LinkedIn</span>
                        </motion.a>
                    </motion.div>
                </div>

                {/* Mapa Grande - Sección Completa */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-10 border-t border-white/10 pt-10"
                >
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 w-full">
                        <iframe
                            title="Ubicación Olimpo Innova"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d-75.6086!3d6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfb80fad05%3A0x42137cfcc7b84b67!2sCl.%2019%20%2357-20%2C%20Guayabal%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                            width="100%"
                            height="420"
                            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)", display: "block" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="mt-3 flex items-center justify-end">
                        <a
                            href="https://maps.google.com/?q=Calle+19+%2357-20,+Guayabal,+Medellín,+Antioquia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-primary hover:text-emerald-400 text-sm font-medium transition-colors"
                        >
                            <MapPin className="w-4 h-4" />
                            Ver en Google Maps →
                        </a>
                    </div>
                </motion.div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/10 flex justify-center items-center">
                    <p className="text-gray-300 text-sm font-medium tracking-wide text-center">
                        &copy; 2026 Olimpo Innova SAS. Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;