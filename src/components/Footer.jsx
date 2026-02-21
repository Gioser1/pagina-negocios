import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navLinks, legalLinks } from "../data/navData";

const Footer = () => {
    return (
        <footer className="bg-[#0a192f] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Sutil glow superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20"
                >
                    <div className="col-span-1 md:col-span-4">
                        <span className="text-3xl font-bold tracking-tighter text-white mb-6 inline-block">Agencia<span className="text-primary">.</span></span>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8 pr-4">
                            Transformamos ideas en experiencias digitales excepcionales que impulsan el crecimiento de tu negocio a escala global.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a
                                whileHover={{ y: -5, backgroundColor: "#02DF82", color: "#0a192f" }}
                                transition={{ duration: 0.2 }}
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">Twitter</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5, backgroundColor: "#02DF82", color: "#0a192f" }}
                                transition={{ duration: 0.2 }}
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 text-gray-400 flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                            </motion.a>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-4 md:pl-12">
                        <h4 className="text-sm tracking-wider uppercase font-semibold mb-6 text-gray-400">Navegación</h4>
                        <ul className="space-y-4">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="text-gray-400 text-sm hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-300">{link.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-4">
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

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-xs tracking-wide">
                        &copy; {new Date().getFullYear()} Agencia. Todos los derechos reservados.
                    </p>
                    <p className="text-gray-500 text-xs mt-4 md:mt-0 tracking-wide">
                        Diseñado para el éxito.
                    </p>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
