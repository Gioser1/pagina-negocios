import { motion } from "framer-motion";
import { clientesData, aliadosData } from "../data/clientesData";
import { useRef, useEffect, useState } from "react";

const ClientesAliados = () => {
    const [clientesWidth, setClientesWidth] = useState(0);
    const [aliadosWidth, setAliadosWidth] = useState(0);
    const clientesRef = useRef(null);
    const aliadosRef = useRef(null);

    useEffect(() => {
        if (clientesRef.current) {
            setClientesWidth(clientesRef.current.scrollWidth / 2);
        }
        if (aliadosRef.current) {
            setAliadosWidth(aliadosRef.current.scrollWidth / 2);
        }
    }, [clientesData.length, aliadosData.length]);

    const renderCard = (item, idx) => (
        <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.05, zIndex: 20 }}
            className="relative group w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 flex flex-shrink-0 items-center justify-center perspective-1000"
        >
            {/* Resplandor exterior */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-400 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition duration-500 z-0"></div>

            {/* Tarjeta principal con Glassmorphism */}
            <div className="w-full h-full relative z-10 bg-white rounded-xl border border-white/20 group-hover:border-primary transition-all flex flex-col items-center justify-center cursor-pointer shadow-md group-hover:shadow-[0_15px_30px_-10px_rgba(2,223,130,0.5)] overflow-hidden p-2 sm:p-4">
                {/* Destello interior superior derecho */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
                    />
                ) : (
                    <div className="text-center relative z-10 px-4">
                        <div className="text-xl sm:text-2xl font-black text-primary group-hover:text-primary-light transition-colors mb-3">
                            {item.initials}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors line-clamp-2">
                            {item.name}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );

    return (
        <section className="py-20 bg-[#0a0a0a] text-white overflow-hidden relative border-t border-white/10" id="clientes">
            {/* Glow de fondo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white"
                >
                    Nuestros <span className="text-primary">Clientes y Aliados</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-gray-400 max-w-2xl mx-auto"
                >
                    Marcas e instituciones que confían en nuestras soluciones digitales.
                </motion.p>
            </div>

            {/* Carrusel de Clientes */}
            <div className="relative pb-10 mb-8">
                <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                <h3 className="text-xl font-bold text-center text-gray-300 mb-6 drop-shadow-md">Nuestros Clientes</h3>

                <motion.div
                    ref={clientesRef}
                    className="flex w-max space-x-4 sm:space-x-6 md:space-x-8 px-4"
                    animate={{ x: [-0, clientesWidth ? -clientesWidth : 0] }}
                    transition={{ x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 25 } }}
                >
                    {[...clientesData, ...clientesData, ...clientesData, ...clientesData].map((item, idx) => renderCard(item, `cliente-${idx}`))}
                </motion.div>
            </div>

            {/* Carrusel de Aliados */}
            <div className="relative pb-10">
                <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                <h3 className="text-xl font-bold text-center text-gray-300 mb-6 drop-shadow-md">Nuestros Aliados</h3>

                <motion.div
                    ref={aliadosRef}
                    className="flex w-max space-x-4 sm:space-x-6 md:space-x-8 px-4"
                    animate={{ x: [aliadosWidth ? -aliadosWidth : 0, 0] }}
                    transition={{ x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 25 } }}
                >
                    {[...aliadosData, ...aliadosData, ...aliadosData, ...aliadosData].map((item, idx) => renderCard(item, `aliado-${idx}`))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClientesAliados;
