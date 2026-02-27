import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const teamList = [
    {
        id: 1,
        src: "/imagenes/Equipo/image00001.jpg",
        name: "Arlinson Posada",
        role: "Co Founder",
        description: "Profesional en Costos y Presupuestos. Es un teso para los números. Le encanta salir a caminar con su mascota Chane. Si los algoritmos fallan, Chane tiene el plan B durante sus caminatas estratégicas.",
        skills: ["Finanzas", "Costos", "Estrategia"]
    },
    {
        id: 2,
        src: "/imagenes/Equipo/image00002.jpeg",
        name: "Óscar Sánchez",
        role: "Project Manager",
        description: "Magister en IA. Docente Catedrático. Siempre tiene una sonrisa. Probablemente la IA le escribe los chistes, pero su sonrisa es 100% real (y contagiosa).",
        skills: ["IA", "Gestión", "Liderazgo"]
    },
    {
        id: 3,
        src: "/imagenes/Equipo/image00003.jpg",
        name: "Santiago Durango",
        role: "Diseñador UI/UX",
        description: "Profesional UI/UX. También es músico. Hace que todo se vea bonito y fácil de usar, lo que explica por qué sus diseños siempre tienen 'buen ritmo'.",
        skills: ["Figma", "UI/UX", "Creatividad"]
    },
    {
        id: 4,
        src: "/imagenes/Equipo/image00005.jpg",
        name: "Deivis Posada",
        role: "CEO y FOUNDER",
        description: "Magíster en Transformación Digital. Siempre sereno para tomar las decisiones. Tiene el súper poder de mantenerse increíblemente sereno mientras todo el código alrededor parece arder.",
        skills: ["Liderazgo", "Transformación Digital"]
    },
    {
        id: 5,
        src: "/imagenes/Equipo/image00006.jpeg",
        name: "Laura Muñoz",
        role: "Full Stack",
        description: "Ingeniera de Datos y Software que deslumbra tanto con su deslumbrante belleza como con su brillante ingenio para dominar el código. Su compañera de viaje en la vida es Kira, su mascota (y la verdadera CEO en las sombras que aprueba el estilo de todos sus proyectos).",
        skills: ["Software", "Datos", "Desarrollo"]
    },
    {
        id: 6,
        src: "/imagenes/Equipo/image00007.jpg",
        name: "Esteban Muñeton",
        role: "Apoyo Full Stack",
        description: "Técnico en Desarollo de Software. Hombre de fe. Su pose para la sesión de foto no le favoreció. Juraba que le saldría su lado Brad Pitt... pero la cámara decidió otra cosa. Seguimos orando por esa foto.",
        skills: ["Desarrollo", "Modelo en Prácticas"]
    },
    {
        id: 7,
        src: "/imagenes/Equipo/image00008.jpeg",
        name: "Alejandro Mejía",
        role: "Apoyo Full Stack",
        description: "Ingeniero de Sistemas. Siempre tiene una idea tecnológica revolucionaria para cambiar el mundo; ahora solo le falta tiempo, financiamiento y convencer al resto del equipo de que no es una locura.",
        skills: ["Sistemas", "Desarrollo", "Ideas Locas"]
    },
    {
        id: 8,
        src: "/imagenes/Equipo/image00009.jpeg",
        name: "Lorena Isaza Gómez",
        role: "Partner",
        description: "Con una presencia espectacular que roba miradas y un talento nato para hacer brillar los proyectos. Le encanta ir al GYM para mantener esa figura increíble, y salir a caminar con su esposo y su bella hija para desconectarse de la Matrix.",
        skills: ["Relaciones Públicas", "Networking"]
    },
    {
        id: 9,
        src: "/imagenes/Equipo/imagen00004.jpeg",
        name: "Sindy Carvajal",
        role: "Apoyo en diseño IU",
        description: "Diseñadora gráfica IU y creadora de interfaces y diseños tan hermosos, deslumbrantes y perfectos como ella misma. Su gran sueño es viajar y conquistar toda Europa junto a sus padres (y de paso, enseñarle a los europeos un par de cosas sobre la verdadera elegancia y buen gusto).",
        skills: ["Diseño IU", "Creatividad", "Viajes"]
    },
];

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const About = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [selectedMember, setSelectedMember] = useState(null);

    // calculate items per page based on window width
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else setItemsPerPage(3);
        };
        handleResize(); // set on init
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxPage = Math.ceil(teamList.length / itemsPerPage) - 1;

    const paginate = (newDirection) => {
        let newPage = page + newDirection;
        if (newPage > maxPage) newPage = 0;
        if (newPage < 0) newPage = maxPage;
        setPage([newPage, newDirection]);
    };

    const currentItems = teamList.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-[#0a0a0a] border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="font-semibold tracking-wide uppercase text-sm mb-3 text-primary"
                    >
                        Quiénes Somos
                    </motion.h2>
                    <motion.h3
                        variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white"
                    >
                        Un equipo apasionado por la innovación
                    </motion.h3>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-lg md:text-xl leading-relaxed font-light text-gray-400"
                    >
                        Cada día creamos valor 360° explorando y aportando a nuestros clientes, colaboradores y comunidades, el diseño y desarrollo de soluciones tecnológicas que transforman procesos, optimizan operaciones y potencian el crecimiento empresarial y la transformación positiva de la vida.
                    </motion.p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative mt-10 h-[450px] md:h-[500px] w-full max-w-6xl mx-auto flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            // Agregamos px-12 sm:px-16 para dar espacio a los botones laterales
                            className="absolute w-full px-12 sm:px-16 flex justify-center gap-6 cursor-grab active:cursor-grabbing"
                        >
                            {currentItems.map((member) => (
                                <motion.div
                                    key={member.id}
                                    className="relative group overflow-hidden rounded-[2rem] aspect-[4/5] flex-1 max-w-[350px] shadow-2xl cursor-pointer bg-white/5 border border-white/10"
                                    onClick={() => setSelectedMember(member)}
                                    whileHover={{ y: -10 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <img
                                        src={member.src}
                                        alt={`Miembro del equipo ${member.name || member.id}`}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${member.id === 9 ? 'scale-[1.25] group-hover:scale-[1.35] object-center' : 'group-hover:scale-110 object-top'}`}
                                    />
                                    {/* Capa de Información (Slide Up) */}
                                    <div className="absolute inset-x-0 bottom-0 pt-12 pb-6 px-6 sm:px-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent">
                                        <div className="h-1 w-12 mb-4 rounded-full shadow-[0_0_10px_rgba(2,223,130,0.6)] shrink-0 bg-primary" />
                                        <h4 className="font-black text-2xl mb-1 shrink-0 text-white">{member.name}</h4>
                                        <p className="text-xs font-bold uppercase tracking-wider mb-3 shrink-0 text-primary">{member.role}</p>

                                        <p className="text-sm leading-relaxed mb-4 line-clamp-2 text-gray-300">
                                            {member.description}
                                        </p>

                                        {/* Insignias de Habilidades */}
                                        <div className="flex flex-wrap gap-2 shrink-0">
                                            {member.skills?.slice(0, 2).map((skill, idx) => (
                                                <span key={idx} className="text-xs font-semibold px-2 py-1 rounded-md border backdrop-blur-sm bg-white/10 text-white border-white/10">
                                                    {skill}
                                                </span>
                                            ))}
                                            {member.skills?.length > 2 && (
                                                <span className="text-xs font-semibold px-2 py-1 bg-transparent text-primary">
                                                    +{member.skills.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Controles del Carrusel (Izquierda/Derecha) */}
                    <motion.button
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border transition-all z-20 shadow-xl bg-black/60 border-white/10 text-white backdrop-blur-md hover:bg-primary hover:border-primary hover:text-black hover:scale-125"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                    </motion.button>
                    <motion.button
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border transition-all z-20 shadow-xl bg-black/60 border-white/10 text-white backdrop-blur-md hover:bg-primary hover:border-primary hover:text-black hover:scale-125"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                    </motion.button>
                </div>

                {/* Puntos de Paginación */}
                <div className="flex justify-center items-center gap-3 mt-4 sm:mt-8">
                    {Array.from({ length: maxPage + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                const dir = idx > page ? 1 : -1;
                                setPage([idx, dir]);
                            }}
                            className={`h-2.5 rounded-full transition-all duration-300 ${page === idx ? "w-10 bg-primary shadow-[0_0_12px_rgba(2,223,130,0.6)]" : "w-2.5 bg-white/20 hover:bg-white/40"}`}
                            aria-label={`Ir a página ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>

            {/* MODAL PARA MIEMBROS DEL EQUIPO */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-4xl bg-[#0a0f1a] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(2,223,130,0.15)] border border-white/10 flex flex-col md:flex-row max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-primary/20 hover:text-primary text-white border border-white/10 transition-all backdrop-blur-md cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden shrink-0 relative bg-black/50">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0f1a] z-10" />
                                <img
                                    src={selectedMember.src}
                                    alt={selectedMember.name}
                                    className={`w-full h-full object-cover ${selectedMember.id === 9 ? 'scale-[1.25] object-center' : 'object-top'}`}
                                />
                            </div>

                            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center overflow-y-auto z-10">
                                <div className="h-1 w-12 bg-primary mb-6 rounded-full shadow-[0_0_10px_rgba(2,223,130,0.6)]" />
                                <h4 className="text-white font-black text-3xl sm:text-4xl mb-2 tracking-tight">{selectedMember.name}</h4>
                                <p className="text-primary text-sm sm:text-base font-bold uppercase tracking-widest mb-6">{selectedMember.role}</p>

                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 font-light">
                                    {selectedMember.description}
                                </p>

                                <div className="mt-auto">
                                    <h5 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Áreas de Experiencia</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMember.skills?.map((skill, idx) => (
                                            <span key={idx} className="text-sm font-medium px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg border border-white/10 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default About;
