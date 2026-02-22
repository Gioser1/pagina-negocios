import { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            // Mocking network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real scenario, you'd fetch to your backend here:
            // const response = await fetch("YOUR_BACKEND_URL", { ... })
            // if (response.ok) { setStatus("success") }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section id="contact" className="py-20 md:py-32 bg-dark-900/40 backdrop-blur-2xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-dark-100 rounded-3xl p-8 md:p-14 shadow-2xl overflow-hidden relative"
                >
                    {/* Decorative blurs */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative text-center mb-10 z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                            className="text-4xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-400 to-white bg-[length:200%_auto]"
                        >
                            ¿Hablamos?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-emerald-50/80 max-w-lg mx-auto"
                        >
                            Déjanos tus datos y nos pondremos en contacto contigo lo antes posible para empezar a trabajar juntos.
                        </motion.p>
                    </div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-6 relative z-10 max-w-2xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="block text-sm font-medium text-emerald-50/80 mb-2">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="Tu nombre"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="block text-sm font-medium text-emerald-50/80 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="tu@email.com"
                                />
                            </motion.div>
                        </div>
                        <motion.div variants={itemVariants}>
                            <label htmlFor="message" className="block text-sm font-medium text-emerald-50/80 mb-2">Mensaje</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                placeholder="Cuéntanos sobre tu proyecto..."
                            ></textarea>
                        </motion.div>

                        <motion.div variants={itemVariants} className="text-center pt-4 mb-8">
                            <motion.button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                whileHover={status === "idle" ? { scale: 1.02 } : {}}
                                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                                className={`
                                    relative overflow-hidden w-full sm:w-auto px-10 py-4 font-medium rounded-xl transition-all duration-300
                                    ${status === "success"
                                        ? "bg-white text-primary"
                                        : "bg-primary text-white hover:bg-emerald-500 hover:shadow-lg hover:shadow-primary/25"}
                                    disabled:opacity-90 disabled:cursor-default
                                `}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    {status === "idle" && <span>Enviar Mensaje</span>}
                                    {status === "loading" && (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Enviando...</span>
                                        </>
                                    )}
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-center space-x-2 text-primary font-bold"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            <span>¡Enviado!</span>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>
                        </motion.div>

                        {/* Error state */}
                        {status === "error" && (
                            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-center mt-4">
                                Ocurrió un error. Por favor inténtalo de nuevo.
                            </motion.p>
                        )}
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
