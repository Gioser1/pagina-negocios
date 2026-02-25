import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Solo scrollea al top si la ruta cambia, sin importar el hash
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
