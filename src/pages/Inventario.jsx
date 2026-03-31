import { useEffect, useState } from "react";

function Inventario() {

  const [inventario, setInventario] = useState([]);
  const [cantidades, setCantidades] = useState({}); // 🔥 cantidades por producto

  const obtenerInventario = async () => {
    const res = await fetch("http://localhost/backend/inventario/obtener_inventario.php");
    const data = await res.json();
    setInventario(data);
  };

  useEffect(() => {
    obtenerInventario();
  }, []);

  const handleCantidadChange = (id, valor) => {
    setCantidades({
      ...cantidades,
      [id]: parseInt(valor) || 0
    });
  };

  const actualizarStock = async (producto_id, cantidad) => {
    try {
      const res = await fetch("http://localhost/backend/inventario/actualizar_inventario.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ producto_id, cantidad })
      });

      const data = await res.json();
      alert(data.mensaje);

      obtenerInventario();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventario</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {inventario.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>

              <td style={{ color: item.stock <= 5 ? "red" : "black" }}>
                {item.stock}
              </td>

              <td>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={cantidades[item.id] || ""}
                  onChange={(e) => handleCantidadChange(item.id, e.target.value)}
                  style={{ width: "70px" }}
                />
              </td>

              <td>
                <button
                  onClick={() =>
                    actualizarStock(item.id, cantidades[item.id] || 1)
                  }
                >
                  +
                </button>

                <button
                  onClick={() =>
                    actualizarStock(item.id, -(cantidades[item.id] || 1))
                  }
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Inventario;