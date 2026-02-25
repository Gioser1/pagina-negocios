import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, MessageSquare, Phone, MapPin, Sparkles, Clock, Globe, ArrowRight } from "lucide-react";

const ContactModal = ({ isOpen, onClose }) => {
    const countries = [
        { name: "Colombia", code: "+57", flag: "co" },
        { name: "USA / Canadá", code: "+1", flag: "us" },
        { name: "España", code: "+34", flag: "es" },
        { name: "México", code: "+52", flag: "mx" },
        { name: "Argentina", code: "+54", flag: "ar" },
        { name: "Perú", code: "+51", flag: "pe" },
        { name: "Chile", code: "+56", flag: "cl" },
        { name: "Ecuador", code: "+593", flag: "ec" },
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
    const [focusedField, setFocusedField] = useState(null);

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
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simular envío
            setStatus("success");
            setFormData({ name: "", email: "", countryCode: "+57", countryFlag: "co", phone: "", message: "" });
            setTimeout(() => {
                setStatus("idle");
                onClose(); // Cerrar el modal después de éxito
            }, 2500);
        } catch (error) {
            setStatus("error");
        }
    };

    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
    };

    // Componente Tarjeta Informativa
    const InfoCard = ({ icon: Icon, title, content, subContent, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all group"
        >
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 text-primary border border-primary/20 shadow-[0_0_15px_rgba(2,223,130,0.1)] group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                <p className="text-gray-300 text-sm">{content}</p>
                {subContent && <p className="text-primary/80 text-xs mt-1 font-medium">{subContent}</p>}
            </div>
        </motion.div>
    );

    // Floating Label Input Component (Compact Version)
    const FloatingInput = ({ icon: Icon, id, type, value, onChange, label, disabled = false, isTextarea = false }) => {
        const isFocused = focusedField === id;
        const hasValue = value.length > 0;
        const active = isFocused || hasValue;

        return (
            <motion.div variants={itemVariants} className="relative w-full group">
                <div
                    className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-400/20 rounded-2xl blur-md transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                        }`}
                />
                <div className={`relative flex ${isTextarea ? 'items-start pt-3' : 'items-center'} bg-[#0a0f1a]/90 backdrop-blur-xl border-2 rounded-2xl px-3 py-1 transition-all duration-300 ${isFocused ? 'border-primary/50 bg-[#121a2f]/95' : 'border-white/10 hover:border-white/20'
                    }`}>
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-gray-500'} ${isTextarea ? 'mt-1' : ''}`} />

                    <div className="relative w-full ml-3 flex flex-col justify-center min-h-[48px]">
                        <label
                            htmlFor={id}
                            className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${active
                                ? 'text-[10px] -translate-y-[14px] text-primary/80 uppercase tracking-widest'
                                : 'text-sm translate-y-0 text-gray-400'
                                }`}
                        >
                            {label}
                        </label>
                        {isTextarea ? (
                            <textarea
                                id={id}
                                required
                                rows={2}
                                value={value}
                                onChange={onChange}
                                onFocus={() => setFocusedField(id)}
                                onBlur={() => setFocusedField(null)}
                                disabled={disabled}
                                className="w-full bg-transparent text-white focus:outline-none resize-none pt-3 pb-1 text-sm custom-scrollbar"
                            />
                        ) : (
                            <input
                                type={type}
                                id={id}
                                required
                                value={value}
                                onChange={onChange}
                                onFocus={() => setFocusedField(id)}
                                onBlur={() => setFocusedField(null)}
                                disabled={disabled}
                                className={`w-full bg-transparent text-white focus:outline-none text-sm ${active ? 'pt-3' : 'pt-0'}`}
                            />
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    {/* Overlay Dinámico */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#02050a]/90 backdrop-blur-xl"
                    />

                    {/* Contenedor Principal del Modal (Max-Width expandido para Side-by-Side) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-[1100px] h-full max-h-[650px] min-h-[500px] bg-[#0a0f1a] border border-white/10 rounded-[2rem] shadow-[0_0_80px_rgba(2,223,130,0.1)] overflow-hidden flex flex-col md:flex-row my-auto mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón Cerrar Global */}
                        <div className="absolute top-4 right-4 z-[60]">
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="w-10 h-10 bg-black/40 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white backdrop-blur-md transition-colors border border-white/10 shadow-lg"
                            >
                                <X size={18} />
                            </motion.button>
                        </div>

                        {/* PANEL IZQUIERDO: Branding e Información (Oculto en móviles pequeños, visible desde md) */}
                        <div className="hidden md:flex md:w-[45%] lg:w-[40%] relative bg-gradient-to-br from-[#0c1322] to-[#060a12] border-r border-white/5 flex-col justify-between p-10 overflow-hidden">
                            {/* Efectos de fondo izquierdo */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2" />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

                            {/* Contenido Izquierdo Arriba */}
                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6"
                                >
                                    <Sparkles className="w-3 h-3" />
                                    <span>Transformación Digital</span>
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4"
                                >
                                    Hablemos <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                                        del Futuro.
                                    </span>
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8"
                                >
                                    Ya sea una aplicación revolucionaria, automatización de procesos o una consulta técnica, nuestro equipo está preparado.
                                </motion.p>
                            </div>

                            {/* Tarjetas de Contacto */}
                            <div className="relative z-10 space-y-3">
                                <InfoCard
                                    icon={Mail}
                                    title="Correo Electrónico"
                                    content="contactenos@olimpo-empresa.com"
                                    subContent="Respuesta en menos de 2h"
                                    delay={0.3}
                                />
                                <InfoCard
                                    icon={Phone}
                                    title="Línea Directa"
                                    content="+57 302 562 7200"
                                    subContent="Lunes - Viernes (8am - 6pm)"
                                    delay={0.4}
                                />
                                <InfoCard
                                    icon={MapPin}
                                    title="Oficina Principal"
                                    content="Cl 19 #57-20, Guayabal"
                                    subContent="Medellín, Colombia"
                                    delay={0.5}
                                />
                            </div>
                        </div>


                        {/* PANEL DERECHO: El Formulario */}
                        <div className="w-full md:w-[55%] lg:w-[60%] relative flex flex-col justify-center p-6 sm:p-10 lg:p-12 h-full overflow-y-auto custom-scrollbar bg-[#0f1524]/50">
                            {/* Decorative Line Right */}
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent md:hidden" />

                            {/* Encabezado visible solo en móvil */}
                            <div className="md:hidden text-center mb-8 mt-2">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-3">
                                    <Sparkles className="w-3 h-3" />
                                    <span>Conversemos</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">
                                    Envíanos un <span className="text-primary">Mensaje</span>
                                </h2>
                            </div>

                            {/* Formulario */}
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-4 sm:space-y-5 w-full max-w-lg mx-auto md:max-w-none relative z-10"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                                    {/* Nombre */}
                                    <div className="lg:col-span-1">
                                        <FloatingInput
                                            icon={User}
                                            id="modal-name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            label="Tu Nombre"
                                            disabled={status === "loading" || status === "success"}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="lg:col-span-1">
                                        <FloatingInput
                                            icon={Mail}
                                            id="modal-email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            label="Correo Electrónico"
                                            disabled={status === "loading" || status === "success"}
                                        />
                                    </div>

                                    {/* Teléfono Complejo */}
                                    <motion.div variants={itemVariants} className="relative lg:col-span-2 group">
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-400/20 rounded-2xl blur-md transition-opacity duration-300 ${focusedField === 'modal-phone' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                                                }`}
                                        />
                                        <div className={`relative flex items-center bg-[#0a0f1a]/90 backdrop-blur-xl border-2 rounded-2xl px-3 py-1 transition-all duration-300 min-h-[48px] ${focusedField === 'modal-phone' ? 'border-primary/50 bg-[#121a2f]/95' : 'border-white/10 hover:border-white/20'
                                            }`}>

                                            <Phone className={`w-4 h-4 transition-colors duration-300 ${focusedField === 'modal-phone' ? 'text-primary' : 'text-gray-500'}`} />

                                            {/* Modulo de País Integrado */}
                                            <div className="relative flex items-center h-full ml-3 border-r border-white/10 pr-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCountries(!showCountries)}
                                                    disabled={status === "loading" || status === "success"}
                                                    className="flex items-center gap-2 hover:bg-white/5 p-1 rounded-md transition-colors group/flag outline-none"
                                                >
                                                    <div className="w-5 h-5 rounded-full overflow-hidden border border-white/10 shadow-inner group-hover/flag:shadow-[0_0_10px_rgba(2,223,130,0.5)] transition-shadow">
                                                        <img
                                                            src={`https://flagcdn.com/w40/${formData.countryFlag}.png`}
                                                            alt="Country"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="font-semibold text-xs text-gray-200">{formData.countryCode}</span>
                                                </button>

                                                <AnimatePresence>
                                                    {showCountries && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute top-10 left-0 bg-[#162032]/95 border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 max-h-48 overflow-y-auto w-56 backdrop-blur-2xl custom-scrollbar"
                                                        >
                                                            <div className="p-1">
                                                                {countries.map((country) => (
                                                                    <button
                                                                        key={country.code + country.name}
                                                                        type="button"
                                                                        onClick={() => handleCountrySelect(country)}
                                                                        className="w-full flex items-center px-2 py-2 hover:bg-primary/20 hover:text-primary transition-all rounded-lg text-left border border-transparent hover:border-primary/30 group/item"
                                                                    >
                                                                        <div className="w-4 h-4 rounded-full overflow-hidden mr-2 border border-white/10 shadow-sm">
                                                                            <img
                                                                                src={`https://flagcdn.com/w40/${country.flag}.png`}
                                                                                alt={country.name}
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        </div>
                                                                        <span className="flex-1 text-gray-300 group-hover/item:text-white font-medium text-xs">{country.name}</span>
                                                                        <span className="text-white/40 group-hover/item:text-primary/70 text-[10px] font-mono">{country.code}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Input Real */}
                                            <div className="relative w-full ml-3 flex flex-col justify-center h-full">
                                                <label
                                                    htmlFor="modal-phone"
                                                    className={`absolute left-0 transition-all duration-300 pointer-events-none font-medium ${focusedField === 'modal-phone' || formData.phone.length > 0
                                                        ? 'text-[10px] -translate-y-[14px] text-primary/80 uppercase tracking-widest'
                                                        : 'text-sm translate-y-0 text-gray-400'
                                                        }`}
                                                >
                                                    Número
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="modal-phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    onFocus={() => setFocusedField('modal-phone')}
                                                    onBlur={() => setFocusedField(null)}
                                                    disabled={status === "loading" || status === "success"}
                                                    className={`w-full bg-transparent text-white focus:outline-none tracking-wide text-sm font-medium ${(focusedField === 'modal-phone' || formData.phone.length > 0) ? 'pt-3' : 'pt-0'}`}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Mensaje */}
                                    <div className="lg:col-span-2">
                                        <FloatingInput
                                            icon={MessageSquare}
                                            id="modal-message"
                                            type="text"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            label="Detalles de tu proyecto..."
                                            isTextarea={true}
                                            disabled={status === "loading" || status === "success"}
                                        />
                                    </div>
                                </div>

                                {/* Botón Enviar */}
                                <motion.div variants={itemVariants} className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === "loading" || status === "success"}
                                        className="relative w-full group overflow-hidden rounded-2xl"
                                    >
                                        <div className={`absolute inset-0 transition-all duration-500 ${status === "success"
                                            ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                                            : "bg-gradient-to-r from-primary to-cyan-500 group-hover:scale-[1.02]"
                                            }`} />

                                        {status !== "success" && (
                                            <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full w-1/2 h-1/2 left-1/4 top-1/4" />
                                        )}

                                        <div className={`relative px-6 py-3.5 flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase transition-all ${status === "success" ? "text-white" : "text-[#0a192f]"
                                            }`}>
                                            {status === "idle" && (
                                                <>
                                                    <span>Enviar Solicitud</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                            {status === "loading" && (
                                                <>
                                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Procesando...</span>
                                                </>
                                            )}
                                            {status === "success" && (
                                                <>
                                                    <Sparkles className="w-4 h-4 animate-pulse" />
                                                    <span>¡Recibido exitosamente!</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </motion.div>

                                <motion.div variants={itemVariants} className="text-center pt-2">
                                    <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1.5 font-medium uppercase tracking-wider">
                                        <Globe className="w-3 h-3 text-primary/50" />
                                        Tus datos están seguros y encriptados.
                                    </p>
                                </motion.div>
                            </motion.form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
