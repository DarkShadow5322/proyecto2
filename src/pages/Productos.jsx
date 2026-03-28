import { useState, useEffect } from "react";

function Productos() {

  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    precio: ""
  });

  // 🔥 Obtener productos
  const obtenerProductos = async () => {
    try {
      const response = await fetch("http://localhost/backend/obtener_productos.php");
      const data = await response.json();

      setProductos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 🔥 Ejecutar al cargar
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Capturar datos
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Guardar producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/backend/guardar_producto.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      alert(data.mensaje);

      await obtenerProductos(); // 🔥 refresca

      setMostrarModal(false);

      setForm({
        codigo: "",
        nombre: "",
        precio: ""
      });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos</h2>

      <button onClick={() => setMostrarModal(true)}>
        Nuevo Producto
      </button>

      {mostrarModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Nuevo Producto</h3>

            <form onSubmit={handleSubmit}>
              <input name="codigo" placeholder="Código" value={form.codigo} onChange={handleChange} required />
              <input name="nombre" placeholder="Producto" value={form.nombre} onChange={handleChange} required />
              <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />

              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

// estilos
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px"
  }
};

export default Productos;