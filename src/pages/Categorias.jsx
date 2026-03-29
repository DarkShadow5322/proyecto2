import { useEffect, useState } from "react";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "http://localhost/api/api_stock_system/node_categoria/list_categoria.php",
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener las categorías");
        return res.json();
      })
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categorias.map((cat) => (
          <li key={cat.id}>{cat.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;
