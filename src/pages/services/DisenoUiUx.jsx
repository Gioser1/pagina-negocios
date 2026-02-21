import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DisenoUiUx = () => {
    return (
        <main className="min-h-screen pt-28 md:pt-32 pb-20 md:pb-24">
            {/* Hero del Servicio */}
            <section className="relative py-16 md:py-24 mb-12 md:mb-16 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 bg-gradient-to-br from-blue-500 to-indigo-700">
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-xs sm:text-sm tracking-wider font-semibold uppercase mb-6">
                            Servicio Especializado
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                            Diseño UI/UX
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
                            Interfaces que capturan miradas y retienen usuarios.
                        </p>
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
                                <h2 className="text-3xl font-bold text-white mb-6">Sobre este servicio</h2>
                                <p className="text-lg text-gray-300 leading-relaxed mb-12">
                                    El diseño no es solo cómo se ve, es cómo funciona. Aplicamos neurodiseño y principios de usabilidad para crear interfaces que guían al usuario intuitivamente hacia la conversión.
                                </p>

                                <h3 className="text-2xl font-bold text-white mb-6">¿Qué incluye?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                    {["Investigación de Usuarios (UX Research)", "Wireframing y Prototipado", "Sistemas de Diseño escalables", "Auditorías de Usabilidad"].map((feature, idx) => (
                                        <div key={idx} className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-md rounded-xl">
                                            <span className="text-primary">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            </span>
                                            <span className="text-gray-300 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0 border-t border-white/10 pt-8 mt-8">
                                    <Link to="/#contact" className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-gray-900 font-bold rounded-xl hover:bg-emerald-500 transition-colors">
                                        Solicitar Presupuesto
                                    </Link>
                                    <Link to="/" className="w-full sm:w-auto text-center px-8 py-4 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-colors">
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
                                    {['React', 'Node.js', 'Figma', 'AWS'].map((tech) => (
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
        </main>
    );
};

export default DisenoUiUx;
