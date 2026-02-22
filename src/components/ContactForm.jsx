import { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
    const countries = [
        { name: "Colombia", code: "+57", flag: "co" },
        { name: "Argentina", code: "+54", flag: "ar" },
        { name: "Brasil", code: "+55", flag: "br" },
        { name: "Chile", code: "+56", flag: "cl" },
        { name: "Ecuador", code: "+593", flag: "ec" },
        { name: "Perú", code: "+51", flag: "pe" },
        { name: "Venezuela", code: "+58", flag: "ve" },
        { name: "México", code: "+52", flag: "mx" },
        { name: "España", code: "+34", flag: "es" },
        { name: "Estados Unidos", code: "+1", flag: "us" },
        { name: "Canadá", code: "+1", flag: "ca" },
        { name: "Alemania", code: "+49", flag: "de" },
        { name: "Francia", code: "+33", flag: "fr" },
        { name: "Italia", code: "+39", flag: "it" },
        { name: "Portugal", code: "+351", flag: "pt" },
        { name: "Reino Unido", code: "+44", flag: "gb" },
    ];

    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        countryCode: "+57",
        countryFlag: "co",
        phone: "", 
        message: "" 
    });
    const [status, setStatus] = useState("idle");
    const [showCountries, setShowCountries] = useState(false);

    const handleCountrySelect = (country) => {
        setFormData({ 
            ...formData, 
            countryCode: country.code,
            countryFlag: country.flag
        });
        setShowCountries(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus("success");
            setFormData({ name: "", email: "", countryCode: "+57", countryFlag: "co", phone: "", message: "" });
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="border-4 border-red-600 rounded-3xl p-8 md:p-14 overflow-hidden relative bg-dark-950/80"
                >
                    {/* Decorative blurs */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Título principal */}
                    <div className="relative text-center mb-12 z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="text-4xl md:text-5xl font-black mb-4 text-white"
                        >
                            Escribenos <span className="text-primary">directamente</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-300 max-w-xl mx-auto text-lg"
                        >
                            Estamos listos para resolver tus dudas o iniciar un nuevo proyecto.
                        </motion.p>
                    </div>

                    {/* Grid con Mapa y Formulario */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
                        {/* Columna Izquierda - Mapa */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            {/* Mapa */}
                            <div className="rounded-2xl overflow-hidden shadow-lg h-80 lg:h-96">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3219474939936!2d-75.55274932346812!3d6.227766924749162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429e37e48e4c3%3A0x1234567890abcdef!2sCl%2019%20%2357-20%2C%20Guayabal%2C%20Medell%C3%ADn!5e0!3m2!1ses!2sco!4v1700000000000"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>

                            {/* Dirección */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-white font-bold text-lg mb-2">Ubicación</h3>
                                <p className="text-gray-300 mb-2">
                                    Cl 19 #57-20, Guayabal, Medellín, Antioquia
                                </p>
                                <a 
                                    href="https://maps.google.com/?q=Cl+19+%2357-20,+Guayabal,+Medellín"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-emerald-400 font-medium transition-colors"
                                >
                                    Ampliar el mapa
                                </a>
                            </div>
                        </motion.div>

                        {/* Columna Derecha - Formulario */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {/* Nombre Completo */}
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="block text-sm font-bold text-white mb-3">
                                    Nombre Completo<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="Tu nombre completo"
                                />
                            </motion.div>

                            {/* Correo Electrónico */}
                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
                                    Correo Electrónico<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="tu@email.com"
                                />
                            </motion.div>

                            {/* Teléfono con Selector de País */}
                            <motion.div variants={itemVariants}>
                                <label htmlFor="phone" className="block text-sm font-bold text-white mb-3">
                                    Teléfono<span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="flex items-center w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                                        {/* Selector de País */}
                                        <button
                                            type="button"
                                            onClick={() => setShowCountries(!showCountries)}
                                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                        >
                                            <img 
                                                src={`https://flagcdn.com/w20/${formData.countryFlag}.png`} 
                                                alt="Country flag" 
                                                className="w-5 h-5" 
                                            />
                                            <span className="font-bold text-sm">{formData.countryCode}</span>
                                        </button>

                                        {/* Separador */}
                                        <span className="mx-2 text-white/40">/</span>

                                        {/* Input de teléfono */}
                                        <input
                                            type="tel"
                                            id="phone"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none"
                                            placeholder="(601) 2345678"
                                        />
                                    </div>

                                    {/* Dropdown de países */}
                                    {showCountries && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full mt-2 left-0 bg-dark-100 border border-white/10 rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto w-full"
                                        >
                                            {countries.map((country) => (
                                                <button
                                                    key={country.code + country.name}
                                                    type="button"
                                                    onClick={() => handleCountrySelect(country)}
                                                    className="w-full flex items-center px-4 py-3 hover:bg-primary/20 transition-colors text-white text-left border-b border-white/5 last:border-b-0"
                                                >
                                                    <img 
                                                        src={`https://flagcdn.com/w20/${country.flag}.png`} 
                                                        alt={country.name} 
                                                        className="w-5 h-5 mr-3" 
                                                    />
                                                    <span className="flex-1">{country.name}</span>
                                                    <span className="text-primary font-medium text-sm">{country.code}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Mensaje */}
                            <motion.div variants={itemVariants}>
                                <label htmlFor="message" className="block text-sm font-bold text-white mb-3">
                                    Mensaje<span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    placeholder="Cuéntanos sobre tu proyecto..."
                                ></textarea>
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-4">
                                <motion.button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    whileHover={status === "idle" ? { scale: 1.02 } : {}}
                                    whileTap={status === "idle" ? { scale: 0.98 } : {}}
                                    className={`
                                        relative overflow-hidden w-full px-10 py-4 font-bold rounded-xl transition-all duration-300
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
