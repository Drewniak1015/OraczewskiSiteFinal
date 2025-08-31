import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Portfolio from "./Components/Portfolio";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Aboutus from "./Components/Aboutus";
import Terms from "./Components/Terms";
import Privacy from "./Components/Privacy";
import Services from "./Components/Services";
import OraczewskiMoment from "./Components/OraczewskiMoment";
import ProtectedRoute from "./Components/ProtectedRoute";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminLogin from "./Components/Admin";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/contact" element={<Form />} />
        <Route path="/Terms" element={<Terms />} />
        <Route
          path="/panel"
          element={
            <ProtectedRoute>
              <OraczewskiMoment />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
