import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
    // Posiciones base del ratón
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Estados visuales
    const [isHovered, setIsHovered] = useState(false);
    const [hoverProps, setHoverProps] = useState(null);

    // Física para el cursor principal (micro-delay ultra sutil)
    // damping: cuánta fricción (frena que no vibre) / stiffness: cuán rápido salta al destino / mass: peso
    const springConfig = { damping: 40, stiffness: 600, mass: 0.05 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        let activeElement = null;
        let initialRect = null;

        const handleMouseMove = (e) => {
            const clientX = e.clientX;
            const clientY = e.clientY;

            const target = e.target;
            const interactive = target.closest("button") || target.closest("a");

            if (interactive) {
                // Determine if we just entered a new interactive element
                if (activeElement !== interactive) {
                    // Start of hover on a new element
                    if (activeElement) {
                        activeElement.style.transform = "translate(0px, 0px) scale(1)";
                    }
                    activeElement = interactive;

                    // Reset transform temporarily to get true native rect bounds without scale distortion
                    activeElement.style.transform = "translate(0px, 0px) scale(1)";
                    initialRect = activeElement.getBoundingClientRect();

                    setIsHovered(true);

                    const computedStyle = getComputedStyle(interactive);
                    const isCircular = computedStyle.borderRadius === "50%" || parseFloat(computedStyle.borderRadius) > 50;
                    const isInput = interactive.tagName === "INPUT" || interactive.tagName === "TEXTAREA";

                    setHoverProps({
                        width: initialRect.width + (isCircular || isInput ? 0 : 12), // Sin borde extra para inputs y circulos
                        height: initialRect.height + (isCircular || isInput ? 0 : 12),
                        borderRadius: computedStyle.borderRadius || "12px"
                    });
                }

                if (initialRect) {
                    const centerX = initialRect.left + initialRect.width / 2;
                    const centerY = initialRect.top + initialRect.height / 2;

                    const distX = clientX - centerX;
                    const distY = clientY - centerY;

                    // Efecto imán inverso: arrastrar el botón hacia el ratón
                    const maxPull = 12; // no tirar de él más de 12px para no romper la UI
                    const pullX = Math.max(-maxPull, Math.min(maxPull, distX * 0.25));
                    const pullY = Math.max(-maxPull, Math.min(maxPull, distY * 0.25));

                    // El cursor (tu marco verde) debe anclarse al centro del botón + el mismo desplazamiento físico que sufre el botón
                    mouseX.set(centerX + pullX);
                    mouseY.set(centerY + pullY);

                    activeElement.style.transition = 'transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)';
                    activeElement.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.02)`;
                }

            } else {
                if (activeElement) {
                    // Muelle de rebote para volver a la posición original
                    activeElement.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
                    activeElement.style.transform = "translate(0px, 0px) scale(1)";
                    activeElement = null;
                    initialRect = null;
                }

                setIsHovered(false);
                setHoverProps(null);

                mouseX.set(clientX);
                mouseY.set(clientY);
            }
        };

        const handleMouseLeaveWindow = () => {
            if (activeElement) {
                activeElement.style.transform = "translate(0px, 0px) scale(1)";
                activeElement = null;
                initialRect = null;
            }
            setIsHovered(false);
            setHoverProps(null);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeaveWindow);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeaveWindow);
            if (activeElement) {
                activeElement.style.transform = "translate(0px, 0px) scale(1)";
            }
        };
    }, [mouseX, mouseY]);

    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    // Variantes de diseño minimalista puro combinadas con las dimensiones reales del botón (Morph & Stick)
    const variants = {
        default: {
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#02DF82",
            border: "0px solid transparent",
            backdropFilter: "blur(0px)",
        },
        hover: hoverProps ? {
            width: hoverProps.width,
            height: hoverProps.height,
            borderRadius: hoverProps.borderRadius,
            backgroundColor: "transparent", // Totalmente transparente para leer el texto
            border: "2px solid #02DF82", // Borde verde nítido para enmarcar el botón
            backdropFilter: "blur(0px)", // Sin blur para legibilidad perfecta
        } : {
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "rgba(2, 223, 130, 0.15)",
            border: "1px solid #02DF82",
            backdropFilter: "blur(2px)",
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100]"
            style={{ x: cursorX, y: cursorY }}
        >
            <motion.div
                className="flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                variants={variants}
                animate={isHovered ? "hover" : "default"}
                transition={{
                    type: "tween",
                    ease: [0.22, 1, 0.36, 1], // Curve elegantisima
                    duration: 0.25
                }}
            />
        </motion.div>
    );
};

export default Cursor;
