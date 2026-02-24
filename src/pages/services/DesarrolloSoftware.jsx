import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DesarrolloSoftware = () => {
    return (
        <main className="min-h-screen pt-28 md:pt-32 pb-20 md:pb-24">
            {/* Hero del Servicio */}
            <section className="relative py-16 md:py-24 mb-12 md:mb-16 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 bg-gradient-to-br from-blue-600 to-indigo-900 border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                            }
                        }}
                    >
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs sm:text-sm tracking-[0.2em] font-bold uppercase mb-6 border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                        >
                            Soluciones a Medida
                        </motion.span>
                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
                            className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-white bg-[length:200%_auto] mb-8 tracking-tight leading-[1.1]"
                            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            Desarrollo de Software
                        </motion.h1>
                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } } }}
                            className="text-xl md:text-2xl text-blue-100/90 font-light max-w-3xl mx-auto leading-relaxed"
                        >
                            Creamos aplicaciones web y móviles robustas, escalables y diseñadas para potenciar el crecimiento de tu negocio en la era digital.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contenido Detallado y Sidebar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Columna Principal (Izquierda) */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111111]/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-white/5 mb-8 relative overflow-hidden">

                            {/* Glow corner */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative z-10"
                            >
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-3xl font-bold mb-6 text-white"
                                >
                                    La base tecnológica de tu éxito
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="text-lg text-gray-400 leading-relaxed mb-12"
                                >
                                    En un mundo hiperconectado, depender de soluciones genéricas limita tu potencial. Nuestro enfoque en el desarrollo de software personalizado garantiza que cada línea de código esté alineada con tus objetivos comerciales. Desde aplicaciones de página única (SPA) ultrarrápidas hasta complejos sistemas de gestión empresarial.
                                </motion.p>

                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-2xl font-bold mb-8 text-white flex items-center gap-3"
                                >
                                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                                    ¿Qué incluye este servicio?
                                </motion.h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                    {[
                                        "Aplicaciones Web Progresivas (PWA)",
                                        "Desarrollo Frontend React/Next.js",
                                        "Backend escalable y APIs RESTful",
                                        "Arquitectura de Microservicios",
                                        "Aplicaciones Nativas iOS & Android",
                                        "Mantenimiento y Soporte Continuo"
                                    ].map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-4 p-4 bg-white/[0.03] hover:bg-white/[0.08] transition-colors backdrop-blur-md rounded-xl border border-white/[0.05]">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                                                {/* Check icon */}
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                            </span>
                                            <span className="text-gray-300 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0 pt-8 mt-4 border-t border-white/10">
                                    <Link to="/#contact" className="w-full sm:w-auto text-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-1">
                                        Iniciar Proyecto
                                    </Link>
                                    <Link to="/" className="w-full sm:w-auto text-center px-8 py-4 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-colors">
                                        Volver al Inicio
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Sidebar Plegable (Derecha) */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-[#111111]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:sticky lg:top-32 shadow-2xl border border-white/5"
                        >
                            <h4 className="text-white font-bold text-xl mb-8 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                                Resumen Técnico
                            </h4>

                            <ul className="space-y-6 mb-10">
                                <li className="flex flex-col bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Impacto</span>
                                    <span className="text-gray-200">Transformación Digital Completa</span>
                                </li>
                                <li className="flex flex-col bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Delivery</span>
                                    <span className="text-gray-200">Metodologías Ágiles (Scrum)</span>
                                </li>
                                <li className="flex flex-col bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Soporte</span>
                                    <span className="text-gray-200">Garantía post-lanzamiento</span>
                                </li>
                            </ul>

                            <div className="pt-6 border-t border-white/10">
                                <h5 className="text-white/80 font-medium mb-4 text-sm uppercase tracking-wide">Stack Principal</h5>
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Docker'].map((tech) => (
                                        <span key={tech} className="px-3 py-1.5 bg-blue-500/10 text-blue-200 rounded-lg text-sm font-medium border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>
        </main>
    );
};

export default DesarrolloSoftware;
