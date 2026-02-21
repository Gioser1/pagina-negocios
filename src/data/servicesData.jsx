import { Code, Smartphone, Palette, Globe } from "lucide-react";

export const servicesData = [
    {
        title: "Desarrollo Web",
        slug: "desarrollo-web",
        description: "Soluciones modernas y escalables con las últimas tecnologías para llevar tu negocio al siguiente nivel.",
        icon: <Code className="w-8 h-8" />
    },
    {
        title: "Diseño UI/UX",
        slug: "diseno-ui-ux",
        description: "Interfaces centradas en el usuario que combinan estética y funcionalidad a la perfección.",
        icon: <Palette className="w-8 h-8" />
    },
    {
        title: "Apps Móviles",
        slug: "apps-moviles",
        description: "Aplicaciones nativas e híbridas diseñadas para ofrecer la mejor experiencia en cualquier dispositivo.",
        icon: <Smartphone className="w-8 h-8" />
    },
    {
        title: "Posicionamiento SEO",
        slug: "posicionamiento-seo",
        description: "Estrategias de visibilidad para asegurar que tus clientes ideales te encuentren en la web.",
        icon: <Globe className="w-8 h-8" />
    }
];
