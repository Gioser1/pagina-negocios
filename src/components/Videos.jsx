import { motion } from "framer-motion";

export default function Videos() {
    return (
        <section className="py-24 relative border-t transition-colors duration-700 bg-dark-900/40 border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 transition-colors duration-1000 text-white">
                        Tecnología en Acción
                    </h2>
                    <p className="font-bold tracking-wide uppercase text-sm transition-colors duration-1000 text-primary">
                        Así transformamos negocios con tecnología.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full rounded-2xl overflow-hidden shadow-2xl border aspect-video transition-colors duration-1000 bg-black border-white/10"
                    >
                        <iframe
                            loading="lazy"
                            src="https://www.youtube.com/embed/DaIdzCwIBGk"
                            className="w-full h-full"
                            allowFullScreen
                            title="Video Comercial 1"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full rounded-2xl overflow-hidden shadow-2xl border aspect-video transition-colors duration-1000 bg-black border-white/10"
                    >
                        <iframe
                            loading="lazy"
                            src="https://www.youtube.com/embed/MCXAOJ0Gfjw"
                            className="w-full h-full"
                            allowFullScreen
                            title="Video Comercial 2"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
