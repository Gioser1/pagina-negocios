import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamList = [
    {
        id: 1,
        src: "/imagenes/Equipo/image00001.jpg",
        name: "Arlinson Posada",
        role: "Desarrollador Senior",
        description: "Arquitecto de código enfocado en soluciones escalables. Convierte problemas complejos en sistemas elegantes.",
        skills: ["React", "Node.js", "Cloud"]
    },
    {
        id: 2,
        src: "/imagenes/Equipo/image00002.jpeg",
        name: "Especialista",
        role: "Desarrollo Frontend",
        description: "Maestro de las animaciones web y la interactividad fluida en el navegador.",
        skills: ["Vue", "React"]
    },
    {
        id: 3,
        src: "/imagenes/Equipo/image00003.jpg",
        name: "Santiago Alvarez",
        role: "Desarrollador UI/UX",
        description: "Diseña experiencias digitales intuitivas y visualmente impactantes, fusionando estética moderna con usabilidad sin fricciones.",
        skills: ["Figma", "TailwindCSS", "UX Research"]
    },
    {
        id: 4,
        src: "/imagenes/Equipo/image00005.jpg",
        name: "Deivis Jovan",
        role: "CEO",
        description: "Líder visionario y fundador. Impulsa la estrategia global de la empresa conectando talento excepcional con oportunidades de negocio transformadoras.",
        skills: ["Liderazgo", "Estrategia", "Innovación"]
    },
    { id: 5, src: "/imagenes/Equipo/image00006.jpeg", name: "Estratega", role: "Marketing Digital", description: "Growth hacker enfocado en la conversión y narrativas transmedia de alto impacto.", skills: ["SEO", "Analytics"] },
    { id: 6, src: "/imagenes/Equipo/image00007.jpg", name: "Visionario", role: "Director Creativo", description: "El nexo artístico entre la identidad visual de la marca y su ejecución técnica.", skills: ["Branding", "Concept"] },
    { id: 7, src: "/imagenes/Equipo/image00008.jpeg", name: "Productor", role: "Producción Audiovisual", description: "Capturando la esencia de cada historia corporativa con la lente perfecta.", skills: ["Premiere", "After Effects"] },
    { id: 8, src: "/imagenes/Equipo/image00009.jpeg", name: "Líder", role: "Gestión de Proyectos", description: "El engranaje principal que asegura entregas a tiempo y con calidad insuperable.", skills: ["Agile", "Scrum"] },
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
        <section id="about" className="py-24 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden">
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
                        className="text-primary font-semibold tracking-wide uppercase text-sm mb-3"
                    >
                        Quiénes Somos
                    </motion.h2>
                    <motion.h3
                        variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        Un equipo apasionado por la innovación
                    </motion.h3>
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-lg md:text-xl text-gray-400 leading-relaxed font-light"
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
                                    className="relative group overflow-hidden rounded-[2rem] aspect-[4/5] flex-1 max-w-[350px] shadow-2xl bg-white/5 border border-white/10"
                                    whileHover={{ y: -10 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <img
                                        src={member.src}
                                        alt={`Miembro del equipo ${member.name || member.id}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Capa de Información (Slide Up) */}
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent pt-12 pb-6 px-6 sm:px-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <div className="h-1 w-12 bg-primary mb-4 rounded-full shadow-[0_0_10px_rgba(2,223,130,0.6)]" />
                                        <h4 className="text-white font-black text-2xl mb-1">{member.name}</h4>
                                        <p className="text-primary text-xs font-bold uppercase tracking-wider mb-3">{member.role}</p>
                                        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {member.description}
                                        </p>
                                        {/* Insignias de Habilidades */}
                                        <div className="flex flex-wrap gap-2">
                                            {member.skills?.map((skill, idx) => (
                                                <span key={idx} className="text-xs font-semibold px-2 py-1 bg-white/10 text-white rounded-md border border-white/10 backdrop-blur-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Controles del Carrusel (Izquierda/Derecha) */}
                    <motion.button
                        animate={{ scale: [1, 1.15, 1], boxShadow: ["0px 0px 0px rgba(2,223,130,0)", "0px 0px 20px rgba(2,223,130,0.4)", "0px 0px 0px rgba(2,223,130,0)"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md hover:bg-primary hover:border-primary hover:text-black hover:scale-125 transition-all z-20 shadow-xl"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                    </motion.button>
                    <motion.button
                        animate={{ scale: [1, 1.15, 1], boxShadow: ["0px 0px 0px rgba(2,223,130,0)", "0px 0px 20px rgba(2,223,130,0.4)", "0px 0px 0px rgba(2,223,130,0)"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md hover:bg-primary hover:border-primary hover:text-black hover:scale-125 transition-all z-20 shadow-xl"
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
        </section>
    );
};

export default About;
