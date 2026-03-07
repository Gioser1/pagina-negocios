import { motion } from "framer-motion";
import { BackgroundBlobs, MagneticButton } from "./CloudEffects";

const HeroCloud = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
            <BackgroundBlobs />
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/cyber-security-concept-digital-art.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-black/80 to-[#020202]" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-[10px] font-bold tracking-widest uppercase mb-8">
                        Next-Gen Cloud Architecture
                    </span>
                    <h1 className="text-6xl md:text-[8rem] font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-sky-600/50 leading-none tracking-tighter">
                        Infraestructura <br />
                        <span className="italic font-light">en la Nube</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed italic">
                        Orquestamos ecosistemas digitales ultra-resilientes. <br />
                        <span className="text-sky-500 underline decoration-sky-500/30 underline-offset-8">Tu negocio, sin límites.</span>
                    </p>

                    <div className="flex justify-center">
                        <MagneticButton
                            onClick={() => {
                                document.getElementById('migration-section').scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-10 py-5 bg-white text-black rounded-full font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-lg uppercase tracking-wider">
                                Explorar Soluciones
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
                <div className="w-px h-10 bg-gradient-to-b from-sky-500 to-transparent" />
            </div>
        </section>
    );
};

export default HeroCloud;
