import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactModal from "../../components/ContactModal";
import Accordion from "../../components/Accordion";

const services = [
{
title: "Asistentes Virtuales Cognitivos",
description:
"Automatización inteligente con interacción humana avanzada. Desarrollamos asistentes capaces de comprender contexto, intención y comportamiento del usuario, integrándose con sistemas empresariales para ejecutar tareas reales.",
benefits: [
"Comprensión contextual",
"Integración con CRM / ERP",
"Respuesta multicanal (web, WhatsApp, app)",
"Automatización 24/7"
],
stats: [
"+80% de empresas planean implementar IA",
"70% de interacciones digitales pueden automatizarse",
"Reducción de +40% en costos operativos"
],
image: "/imagenes/micrositios/Motores-ia/asistentes.jpg"
},

{
title: "Procesamiento de Lenguaje Natural (NLP)",
description:
"Implementamos modelos de PNL que permiten a las plataformas interpretar texto, voz e intención para clasificación, análisis semántico y automatización avanzada.",
benefits: [
"Análisis de sentimientos",
"Clasificación automática de textos",
"Extracción de entidades",
"Automatización documental"
],
stats: [
"80% de los datos empresariales son no estructurados",
"IA basada en lenguaje mejora precisión hasta 30%",
"Automatización documental reduce tiempos 50–70%"
],
image: "/imagenes/micrositios/Motores-ia/npl.jpg"
},

{
title: "Análisis Predictivo",
description:
"Desarrollamos modelos de machine learning que identifican patrones, anticipan comportamientos y proyectan escenarios estratégicos para la toma de decisiones.",
benefits: [
"Proyección de demanda",
"Detección de riesgos",
"Optimización de inventarios",
"Modelos de scoring y segmentación"
],
stats: [
"Empresas data-driven son 23x más propensas a adquirir clientes",
"IA predictiva puede aumentar ingresos hasta 15%",
"Reducción de riesgos operativos hasta 30%"
],
image: "/imagenes/micrositios/motores-ia/predictivo.jpg"
},

{
title: "IA Generativa Empresarial",
description:
"Implementamos soluciones de IA generativa para creación de contenido, automatización documental, generación de código y asistentes internos empresariales.",
benefits: [
"Generación automática de contenido",
"Automatización de documentos",
"Copilotos empresariales internos",
"Optimización de procesos creativos"
],
stats: [
"75% de empresas ya experimentan con IA generativa",
"Aumento de productividad hasta 40%",
"Reducción de tiempos operativos hasta 30%"
],
image: "/imagenes/micrositios/motores-ia/generativa.jpg"
},

{
title: "Visión Computacional",
description:
"Desarrollamos soluciones de visión artificial capaces de analizar imágenes y video en tiempo real para detección, reconocimiento y automatización de decisiones.",
benefits: [
"Reconocimiento facial y biométrico",
"Detección de objetos y anomalías",
"Automatización de inspección visual",
"Monitoreo inteligente en tiempo real"
],
stats: [
"Reducción de errores humanos hasta 90%",
"Mejora detección temprana +35%",
"Crecimiento anual del sector >20%"
],
image: "/imagenes/micrositios/motores-ia/vision.jpg"
},

{
title: "Modelos de IA Personalizados",
description:
"Desarrollamos modelos de lenguaje y sistemas de IA entrenados con información privada de la organización garantizando seguridad y precisión.",
benefits: [
"Entrenamiento con datos corporativos",
"Mayor precisión contextual",
"Control y confidencialidad",
"Implementación on-premise o cloud privada"
],
stats: [
"68% de empresas priorizan IA privada",
"Precisión mejora 25-40%",
"+60% corporaciones adoptan IA propietaria"
],
image: "/imagenes/micrositios/motores-ia/modelos.jpg"
}
];

const MotoresIA = () => {

const [isModalOpen, setIsModalOpen] = useState(false);

return (
<main className="min-h-screen pt-28 pb-24">

{/* HERO */}

<section className="relative py-28 mb-20 overflow-hidden rounded-3xl mx-6">

<div
className="absolute inset-0 bg-cover bg-center scale-110"
style={{
backgroundImage: "url('/imagenes/micrositios/Motores-ia/banner.jpg')"
}}
/>

<div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-900/70 to-indigo-900/90"/>

<div className="relative z-10 max-w-5xl mx-auto text-center px-6">

<motion.span
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="inline-block py-1 px-4 rounded-full bg-white/10 text-emerald-200 text-sm tracking-widest mb-6 backdrop-blur"
>
Inteligencia Artificial
</motion.span>

<motion.h1
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-5xl md:text-7xl font-black text-white mb-6"
>
Motores de IA
</motion.h1>

<p className="text-xl text-emerald-100 max-w-3xl mx-auto">
Dota de inteligencia a tus procesos y productos mediante modelos que
aprenden, predicen y automatizan decisiones.
</p>

</div>

</section>

{/* CONTENIDO */}

<section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

<div className="lg:col-span-2 space-y-6">

{services.map((service,index)=>(

<Accordion key={index} title={service.title}>

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="flex flex-col md:flex-row gap-8 pt-4"
>

{/* TEXTO */}

<div className="md:w-1/2 space-y-6">

<p className="text-gray-300 leading-relaxed">
{service.description}
</p>

<div className="bg-white/5 p-5 rounded-xl border border-white/10">
<h4 className="font-semibold text-white mb-3">
Beneficios Clave
</h4>

<ul className="space-y-2 text-gray-300 text-sm">

{service.benefits.map((b,i)=>(

<li key={i} className="flex items-start gap-2">

<span className="text-emerald-400 mt-1">●</span>

{b}

</li>

))}

</ul>

</div>

<div className="bg-white/5 p-5 rounded-xl border border-white/10">

<h4 className="font-semibold text-white mb-3">
Datos Globales
</h4>

<ul className="space-y-2 text-gray-300 text-sm">

{service.stats.map((s,i)=>(

<li key={i} className="flex items-start gap-2">

<span className="text-indigo-400 mt-1">◆</span>

{s}

</li>

))}

</ul>

</div>

</div>

{/* IMAGEN */}

<div className="md:w-1/2">

<div className="overflow-hidden rounded-xl shadow-2xl group">

<img
src={service.image}
alt={service.title}
className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
/>

</div>

</div>

</motion.div>

</Accordion>

))}

{/* BOTONES */}

<div className="flex gap-4 pt-8 border-t border-white/10">

<button
onClick={()=>setIsModalOpen(true)}
className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-emerald-500/30 transition"
>
Implementar IA
</button>

<Link
to="/"
className="px-8 py-4 bg-white/5 text-gray-300 rounded-xl border border-white/10 hover:bg-white/10 transition"
>
Volver al Inicio
</Link>

</div>

</div>

{/* SIDEBAR */}

<div className="bg-[#0e1117]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-fit sticky top-32">

<h4 className="text-white font-bold text-xl mb-6">
Resumen Técnico
</h4>

<ul className="space-y-4 mb-8">

<li className="bg-white/5 p-4 rounded-lg border border-white/10">

<span className="text-emerald-400 text-xs uppercase">
Precisión
</span>

<p className="text-gray-200 mt-1">
Modelos Fine-Tuned
</p>

</li>

<li className="bg-white/5 p-4 rounded-lg border border-white/10">

<span className="text-emerald-400 text-xs uppercase">
Privacidad
</span>

<p className="text-gray-200 mt-1">
Datos empresariales protegidos
</p>

</li>

</ul>

<div>

<h5 className="text-white/70 mb-3 text-sm uppercase">
Stack IA
</h5>

<div className="flex flex-wrap gap-2">

{[
"OpenAI API",
"TensorFlow",
"PyTorch",
"HuggingFace",
"Pinecone",
"LangChain"
].map((tech)=>(

<span
key={tech}
className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-md text-sm"
>
{tech}
</span>

))}

</div>

</div>

</div>

</section>

<ContactModal
isOpen={isModalOpen}
onClose={()=>setIsModalOpen(false)}
/>

</main>
);
};

export default MotoresIA;