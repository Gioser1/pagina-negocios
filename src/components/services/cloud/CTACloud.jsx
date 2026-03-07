import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTACloud = ({ onOpenModal }) => {
    return (
        <section className="relative py-40 px-4 overflow-hidden transform-gpu">
            <div className="absolute inset-0 z-0 transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-600/10 via-black to-indigo-900/10" />
                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20 transform-gpu" style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/website-hosting-concept-with-cloud.jpg')" }} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-6xl md:text-[7rem] font-black text-white mb-10 tracking-tight leading-[0.9]">
                        ¿Arquitectura <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white italic">preparada?</span>
                    </h2>
                    <p className="text-2xl text-gray-500 mb-16 italic font-light max-w-2xl mx-auto">Ventaja competitiva real.</p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <button
                            onClick={onOpenModal}
                            className="group relative px-12 py-6 bg-sky-600 rounded-2xl font-black text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl will-change-transform"
                        >
                            <span className="relative z-10 uppercase tracking-widest text-white">Solicitar Auditoría</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                        </button>
                        <Link
                            to="/"
                            className="px-12 py-6 bg-white/5 rounded-2xl font-black text-xl border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest will-change-transform"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Inicio
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTACloud;
