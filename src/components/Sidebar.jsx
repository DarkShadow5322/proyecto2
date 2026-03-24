import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Inventario</h2>

      <ul>

        <p>Gestión</p>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
        <li><Link to="/inventario">Inventario</Link></li>

        <p>Análisis</p>
        <li><Link to="/movimientos">Movimientos</Link></li>

        <p>Gestión</p>
        <li><Link to="/reportes">Reportes</Link></li>
        <li><Link to="/alertas">Alertas</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;