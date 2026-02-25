import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ContactModal = ({ isOpen, onClose }) => {
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

    // Evitar scroll cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

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
            setTimeout(() => {
                setStatus("idle");
                onClose(); // Cerrar el modal después de éxito
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 sm:px-6 py-6 md:py-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {/* Overlay oscuro desenfocado */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md"
                    />

                    {/* Contenedor del Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-5xl bg-dark-900 border border-dark-100/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-auto my-auto"
                    >
                        {/* Botón Cerrar (Sticky para fácil acceso) */}
                        <div className="absolute top-4 right-4 z-20">
                            <button
                                onClick={onClose}
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors border border-white/10 shadow-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Contenido */}
                        <div className="p-6 md:p-10 relative">
                            {/* Decorative blurs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20"></div>

                            {/* Título principal */}
                            <div className="relative text-center mb-10 z-10 hidden md:block">
                                <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">
                                    Contáctanos <span className="text-primary">directamente</span>
                                </h2>
                                <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
                                    Estamos listos para resolver tus dudas o iniciar un nuevo proyecto.
                                </p>
                            </div>

                            {/* Grid con Mapa y Formulario */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 relative z-10">
                                {/* Columna Izquierda - Mapa (Ocultar en móviles muy pequeños para ahorrar espacio vertical si prefieres, 
                                     ahora lo mantendremos pero con menor altura) */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="flex flex-col gap-5 order-2 lg:order-1"
                                >
                                    {/* Dirección */}
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                        <h3 className="text-white font-bold text-lg mb-2">Ubicación</h3>
                                        <p className="text-gray-300 text-sm mb-3">
                                            Cl 19 #57-20, Guayabal, Medellín, Antioquia
                                        </p>
                                        <a
                                            href="https://maps.google.com/?q=Cl+19+%2357-20,+Guayabal,+Medellín"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-emerald-400 font-medium text-sm transition-colors"
                                        >
                                            Ver en Google Maps &rarr;
                                        </a>
                                    </div>

                                    {/* Mapa Compacto */}
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-[250px] lg:h-full lg:min-h-[300px]">
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
                                </motion.div>

                                {/* Columna Derecha - Formulario */}
                                <motion.form
                                    onSubmit={handleSubmit}
                                    className="space-y-5 order-1 lg:order-2"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div className="md:hidden text-left mb-6 mt-2">
                                        <h2 className="text-2xl font-black text-white">
                                            Contáctanos
                                        </h2>
                                    </div>

                                    {/* Nombre C. */}
                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="modal-name" className="block text-xs font-bold text-gray-300 mb-2">
                                            Nombre Completo<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="modal-name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all text-sm"
                                            placeholder="Tu nombre completo"
                                        />
                                    </motion.div>

                                    {/* Correo Electrónico */}
                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="modal-email" className="block text-xs font-bold text-gray-300 mb-2">
                                            Correo Electrónico<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="modal-email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all text-sm"
                                            placeholder="tu@email.com"
                                        />
                                    </motion.div>

                                    {/* Teléfono con Selector de País */}
                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="modal-phone" className="block text-xs font-bold text-gray-300 mb-2">
                                            Teléfono<span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="flex items-center w-full px-3 py-2 bg-[#151515] border border-white/10 rounded-xl text-white focus-within:ring-1 focus-within:ring-primary focus-within:border-transparent transition-all text-sm">
                                                {/* Selector C. */}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCountries(!showCountries)}
                                                    className="flex items-center gap-1.5 hover:opacity-80 transition-opacity bg-white/5 p-1.5 rounded-lg border border-white/5"
                                                >
                                                    <img
                                                        src={`https://flagcdn.com/w20/${formData.countryFlag}.png`}
                                                        alt="Country"
                                                        className="w-4 h-4 object-cover rounded-sm"
                                                    />
                                                    <span className="font-bold text-xs">{formData.countryCode}</span>
                                                </button>

                                                <span className="mx-2 text-white/20">|</span>

                                                {/* Input de teléfono */}
                                                <input
                                                    type="tel"
                                                    id="modal-phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="flex-1 bg-transparent text-white placeholder-white/20 focus:outline-none min-w-0"
                                                    placeholder="(601) 2345678"
                                                />
                                            </div>

                                            {/* Dropdown de países */}
                                            {showCountries && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute top-full mt-2 left-0 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl z-50 max-h-56 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                                >
                                                    {countries.map((country) => (
                                                        <button
                                                            key={country.code + country.name}
                                                            type="button"
                                                            onClick={() => handleCountrySelect(country)}
                                                            className="w-full flex items-center px-4 py-2 hover:bg-white/5 transition-colors text-white text-left text-sm border-b border-white/5 last:border-b-0"
                                                        >
                                                            <img
                                                                src={`https://flagcdn.com/w20/${country.flag}.png`}
                                                                alt={country.name}
                                                                className="w-4 h-4 mr-2"
                                                            />
                                                            <span className="flex-1 text-gray-300">{country.name}</span>
                                                            <span className="text-white/50 text-xs">{country.code}</span>
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Mensaje */}
                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="modal-message" className="block text-xs font-bold text-gray-300 mb-2">
                                            Mensaje<span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="modal-message"
                                            required
                                            rows={3}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-[#151515] border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all resize-none text-sm"
                                            placeholder="Detalles sobre tu proyecto..."
                                        ></textarea>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="pt-2">
                                        <motion.button
                                            type="submit"
                                            disabled={status === "loading" || status === "success"}
                                            whileTap={status === "idle" ? { scale: 0.98 } : {}}
                                            className={`
                                                w-full px-6 py-3 font-bold text-sm tracking-wide rounded-xl transition-all duration-300 overflow-hidden relative
                                                ${status === "success"
                                                    ? "bg-white text-primary"
                                                    : "bg-primary text-gray-900 border border-primary/50 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(2,223,130,0.3)]"}
                                                disabled:opacity-90 disabled:cursor-not-allowed
                                            `}
                                        >
                                            <div className="flex items-center justify-center space-x-2 relative z-10">
                                                {status === "idle" && <span>Enviar Solicitud</span>}
                                                {status === "loading" && (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Enviando...</span>
                                                    </>
                                                )}
                                                {status === "success" && (
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                        <span>¡Enviado con Éxito!</span>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Efecto de carga en background para feedback visual (opcional) */}
                                            {status === "loading" && (
                                                <div className="absolute top-0 left-0 h-full bg-white/20 animate-pulse w-full"></div>
                                            )}
                                        </motion.button>
                                    </motion.div>

                                    {status === "error" && (
                                        <p className="text-red-400 text-center text-xs mt-2">
                                            Ocurrió un error. Inténtalo de nuevo.
                                        </p>
                                    )}
                                </motion.form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
