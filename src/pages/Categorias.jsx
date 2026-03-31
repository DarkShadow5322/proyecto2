import { useEffect, useState } from "react";

function Categorias() {

  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [form, setForm] = useState({
    nombre: ""
  });

  const obtenerCategorias = async () => {
    try {
      const res = await fetch("http://localhost/backend/categorias/listar_categorias.php");
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const editarCategoria = (cat) => {
  setForm({ nombre: cat.nombre });
  setIdEditar(cat.id);
  setEditando(true);
  setMostrarModal(true);
};

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      nombre: e.target.value
    });
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

  const url = editando
    ? "http://localhost/backend/categorias/actualizar_categoria.php"
    : "http://localhost/backend/categorias/guardar_categoria.php";

  const body = editando
    ? { id: idEditar, ...form }
    : form;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  alert(data.mensaje);

  await obtenerCategorias();

  setMostrarModal(false);
  setForm({ nombre: "" });
  setEditando(false);
};

  const eliminarCategoria = async (id) => {
    if (!confirm("¿Eliminar categoría?")) return;

    try {
      const res = await fetch("http://localhost/backend/categorias/eliminar_categoria.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      const data = await res.json();

      alert(data.mensaje);

      await obtenerCategorias();

    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Categorías</h2>

      <button onClick={() => setMostrarModal(true)}>
        Nueva Categoría
      </button>

      {/* MODAL */}
      {mostrarModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Nueva Categoría</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />

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
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((cat, index) => (
            <tr key={cat.id}>
              <td>{index + 1}</td>
              <td>{cat.nombre}</td>
              <td>
                <button onClick={() => editarCategoria(cat)}>
                  Editar
                </button>
                <button onClick={() => eliminarCategoria(cat.id)}>
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

export default Categorias;