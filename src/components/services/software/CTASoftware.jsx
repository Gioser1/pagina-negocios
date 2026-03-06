import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASoftware = ({ onOpenModal }) => {
    return (
        <section className="relative py-24 px-4 bg-[#050505]/40 overflow-hidden" style={{ contentVisibility: 'auto' }}>
            <div className="absolute inset-0 z-0 transform-gpu">
                {/* Optimización 3 & 4: Blur reducido de 150px a 80px y whileInView */}
                <div className="absolute inset-0 bg-blue-600/5" />

                <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25" style={{ backgroundImage: "url('/imagenes/micrositios/Desarrollo-software/person-working-html-computer.jpg')" }} />

                <img
                    src="/imagenes/micrositios/Desarrollo-software/person-pressing-power-button.jpg"
                    alt="Final CTA"
                    className="absolute right-0 bottom-0 w-full h-full object-cover opacity-15 grayscale pointer-events-none transform-gpu"
                    loading="lazy"
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tighter">¿Listo para desarrollar tu <br /><span className="text-blue-500 italic">plataforma digital?</span></h2>
                    <p className="text-2xl text-gray-500 mb-12 font-light italic">Transformamos ideas complejas en realidades técnicas escalables.</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={onOpenModal}
                            className="group relative px-12 py-6 bg-blue-600 rounded-full font-bold text-xl overflow-hidden transition-[background-color,transform] duration-300 hover:bg-blue-500 hover:scale-[1.03] active:scale-95 shadow-2xl shadow-blue-500/40 transform-gpu"
                        >
                            <span className="relative z-10 uppercase tracking-widest text-white">Solicitar asesoría</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                        </button>
                        <Link
                            to="/"
                            className="px-12 py-6 bg-white/5 rounded-full font-bold text-xl border border-white/10 hover:bg-white/10 transition-colors duration-300 uppercase tracking-widest"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASoftware;
