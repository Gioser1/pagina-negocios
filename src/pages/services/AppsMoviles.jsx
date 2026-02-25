import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactModal from "../../components/ContactModal";

const AppsMoviles = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen pt-28 md:pt-32 pb-20 md:pb-24">
            {/* Hero del Servicio */}
            <section className="relative py-16 md:py-24 mb-12 md:mb-16 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 bg-gradient-to-br from-purple-500 to-fuchsia-700">
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
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
                            className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-xs sm:text-sm tracking-wider font-semibold uppercase mb-6"
                        >
                            Servicio Especializado
                        </motion.span>
                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } } }}
                            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-200 to-white bg-[length:200%_auto] mb-6 tracking-tight leading-tight pb-2 md:pb-4"
                            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            Apps Móviles
                        </motion.h1>
                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20, filter: "blur(10px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } } }}
                            className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto"
                        >
                            Tu marca en el bolsillo de tus clientes, siempre disponible.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contenido Detallado y Sidebar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Columna Principal (Izquierda) */}
                    <div className="lg:col-span-2">
                        <div className="bg-dark-100/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-white/5 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-400 to-white bg-[length:200%_auto] pb-2 md:pb-4"
                                    animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                                    style={{ animationDuration: "5s", animationIterationCount: "infinite", animationTimingFunction: "linear" }}
                                >
                                    Sobre este servicio
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="text-lg text-gray-300 leading-relaxed mb-12"
                                >
                                    Desarrollamos aplicaciones nativas e híbridas (React Native, Flutter) que ofrecen experiencias fluidas y aprovechan al máximo el hardware de los dispositivos.
                                </motion.p>

                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-400 to-white bg-[length:200%_auto] pb-2 md:pb-4"
                                    animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                                    style={{ animationDuration: "5s", animationIterationCount: "infinite", animationTimingFunction: "linear" }}
                                >
                                    ¿Qué incluye?
                                </motion.h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                    {["iOS y Android", "Experiencia Nativa", "Sincronización Offline", "Notificaciones Push Premium"].map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-md rounded-xl">
                                            <span className="text-primary">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </span>
                                            <span className="text-gray-300 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0 border-t border-white/10 pt-8 mt-8">
                                    <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto text-center px-6 py-3 sm:px-8 sm:py-4 bg-primary text-gray-900 font-bold rounded-xl hover:bg-emerald-500 transition-colors">
                                        Solicitar Presupuesto
                                    </button>
                                    <Link to="/" className="w-full sm:w-auto text-center px-6 py-3 sm:px-8 sm:py-4 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-colors">
                                        Volver atrás
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
                            className="bg-dark-100 rounded-3xl p-6 sm:p-8 lg:sticky lg:top-32 shadow-xl"
                        >
                            <h4 className="text-white font-bold text-xl mb-6">Resumen del servicio</h4>

                            <ul className="space-y-6 mb-8">
                                <li className="flex flex-col">
                                    <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-1">Para quién es</span>
                                    <span className="text-gray-300">Empresas en fase de escalado</span>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-1">Tiempo de entrega</span>
                                    <span className="text-gray-300">2 a 6 semanas</span>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-1">Modalidad</span>
                                    <span className="text-gray-300">Online / Remoto</span>
                                </li>
                            </ul>

                            <div className="pt-6 border-t border-white/10">
                                <h5 className="text-white/90 font-medium mb-4">Tecnologías</h5>
                                <div className="flex flex-wrap gap-2">
                                    {['React Native', 'Flutter', 'iOS', 'Android'].map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
};

export default AppsMoviles;
