import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import Categorias from "./pages/Categorias";
import Proveedores from "./pages/Proveedores";
import Movimientos from "./pages/Movimientos";
import Reportes from "./pages/Reportes";
import Alertas from "./pages/Alertas";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/productos" element={<Proveedores />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/inventario" element={<h1>Inventario</h1>} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/alertas" element={<Alertas />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;