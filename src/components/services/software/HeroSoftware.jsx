import { motion, useTransform } from "framer-motion";

const HeroSoftware = () => {

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden transform-gpu">
            <div className="absolute inset-0 z-0 bg-[#050505]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/portrait-male-engineer-working-field-engineers-day-celebration.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black/40 to-[#050505]" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.h1
                        className="text-5xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-500 tracking-tight will-change-[transform,opacity]"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Desarrollo de Software
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto font-light leading-relaxed italic"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Soluciones tecnológicas modernas diseñadas para escalar, <br />
                        <span className="text-blue-400 font-medium">optimizar procesos y potenciar el crecimiento digital.</span>
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button
                            onClick={() => {
                                document.getElementById('pwa-section').scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-10 py-5 bg-blue-600 rounded-full font-bold overflow-hidden transition-[background-color,transform] duration-300 hover:bg-blue-500 hover:scale-[1.03] active:scale-95 shadow-2xl shadow-blue-500/20 transform-gpu"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-lg uppercase tracking-wider">
                                Explorar servicios
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Optimización 2: Animación finita (repeat: 6) */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: 6, duration: 2, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-blue-400 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSoftware;
