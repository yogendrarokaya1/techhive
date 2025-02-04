import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Landingpage from "./pages/landingpage/Landingpage";
import Gadgets from "./pages/gadgets/Gadgets";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<Landingpage />} />
        <Route path="/gadgets" element={<Gadgets />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
