import { useState, useEffect } from "react";

function Productos() {

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    precio: "",
    categoria_id: ""
  });

  useEffect(() => {
    fetch("http://localhost/backend/categorias/listar_categorias.php")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error(err));
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch("http://localhost/backend/productos/obtener_productos.php");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editarProducto = (p) => {
  setForm({
    codigo: p.codigo,
    nombre: p.nombre,
    precio: p.precio,
    categoria_id: p.categoria_id || ""
  });

  setIdEditar(p.id);
  setEditando(true);
  setMostrarModal(true);
};

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = editando
      ? "http://localhost/backend/productos/actualizar_producto.php"
      : "http://localhost/backend/productos/guardar_producto.php";

    const body = editando
      ? { id: idEditar, ...form }
      : form;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    alert(data.mensaje);

    await obtenerProductos();

    setMostrarModal(false);

    setForm({
      codigo: "",
      nombre: "",
      precio: "",
      categoria_id: ""
    });

    setEditando(false);

  } catch (error) {
    console.error("Error:", error);
  }
};

const eliminarProducto = async (id) => {
  if (!confirm("¿Eliminar producto?")) return;

  try {
    const res = await fetch("http://localhost/backend/productos/eliminar_producto.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    const data = await res.json();

    alert(data.mensaje);

    await obtenerProductos();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos</h2>

      <button onClick={() => setMostrarModal(true)}>
        Nuevo Producto
      </button>

      {/* MODAL */}
      {mostrarModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Nuevo Producto</h3>

            <form onSubmit={handleSubmit}>
              <input
                name="codigo"
                placeholder="Código"
                value={form.codigo}
                onChange={handleChange}
                required
              />

              <input
                name="nombre"
                placeholder="Producto"
                value={form.nombre}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
                required
              />

              {/* SELECT DE CATEGORÍAS */}
              <select
                name="categoria_id"
                value={form.categoria_id || ""}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>

              <br /><br />

              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TABLA */}
      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Código</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>{p.categoria_nombre || "Sin categoría"}</td>
              <td>
                <button onClick={() => editarProducto(p)}>
                Editar
                </button>
                <button onClick={() => eliminarProducto(p.id)}>
                Eliminar
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

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