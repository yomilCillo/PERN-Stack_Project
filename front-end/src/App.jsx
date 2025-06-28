//import necessary libraries
import Navbar from "./components/navBar";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme="forest">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
