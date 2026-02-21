import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

import Home from "./pages/Home";
import DesarrolloWeb from "./pages/services/DesarrolloWeb";
import DisenoUiUx from "./pages/services/DisenoUiUx";
import AppsMoviles from "./pages/services/AppsMoviles";
import PosicionamientoSeo from "./pages/services/PosicionamientoSeo";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // Barra de progreso de scroll global
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <ScrollToTop />
      <div className="relative">
        {/* Scroll Progress Bar Superior Global */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[100] pointer-events-none"
          style={{ scaleX }}
        />

        <Cursor />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios/desarrollo-web" element={<DesarrolloWeb />} />
          <Route path="/servicios/diseno-ui-ux" element={<DisenoUiUx />} />
          <Route path="/servicios/apps-moviles" element={<AppsMoviles />} />
          <Route path="/servicios/posicionamiento-seo" element={<PosicionamientoSeo />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
