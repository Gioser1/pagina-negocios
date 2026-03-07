import { motion } from "framer-motion";

const ServerlessCloud = () => {
    return (
        <section className="relative py-40 px-4 transform-gpu">
            <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-indigo-900/10 to-sky-900/10 border border-white/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group transform-gpu">
                    <div
                        className="absolute top-0 right-0 w-full h-full opacity-[0.02] grayscale pointer-events-none transform-gpu"
                        style={{ backgroundImage: "url('/imagenes/micrositios/Infraestructura-en-la-nube/saas-concept-collage.jpg')", backgroundSize: "cover" }}
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                                Serverless & <br />
                                <span className="text-sky-500">Contenedores.</span>
                            </h2>
                            <p className="text-gray-400 text-xl leading-relaxed mb-12 italic">
                                Desacoplamos tu lógica de la infraestructura. Ejecuta código, no servidores.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Microservicios orquestados con Kubernetes.",
                                    "Funciones Lambda para procesamiento asíncrono.",
                                    "Despliegues CI/CD en segundos."
                                ].map((li, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-gray-300">
                                        <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.4)]" />
                                        <span className="text-lg font-light italic">{li}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    className="aspect-square bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col justify-end group/box will-change-transform"
                                    whileHover={{ y: -5, backgroundColor: "rgba(14, 165, 233, 0.05)" }}
                                >
                                    <span className="text-sky-400 font-black text-4xl mb-4 block tracking-tighter transition-transform group-hover/box:scale-105">DOCKER</span>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-none">Portabilidad</p>
                                </motion.div>
                                <motion.div
                                    className="aspect-square bg-sky-600 rounded-[2rem] p-8 flex flex-col justify-end mt-12 group/box shadow-lg shadow-sky-600/10 will-change-transform"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    <span className="text-white font-black text-4xl mb-4 block tracking-tighter">K8s</span>
                                    <p className="text-sky-200 text-xs font-bold uppercase tracking-widest leading-none">Scaling</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServerlessCloud;
