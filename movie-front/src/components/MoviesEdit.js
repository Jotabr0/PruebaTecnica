import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const endpoint = "http://localhost:8000/api/pelicula/";

const MoviesEdit = () => {
  const [nombre, setNombre] = useState("");
  const [anio_estreno, setAnio_estreno] = useState("");
  const [portadaFile, setPortadaFile] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const token = localStorage.getItem('jwt');

  const update = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("anio_estreno", anio_estreno);
    formData.append("portada", portadaFile);

    // Agregar categorías seleccionadas al formData
    categoriasSeleccionadas.forEach((categoriaId) => {
        formData.append("categorias[]", categoriaId);
    });

    try {
      await axios.post(`${endpoint}${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`
          
        },
      });

      setErrors(null);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Manejar errores de validación
        setErrors(error.response.data.errors);
      } else {
        console.error("Error al actualizar película", error);
      }
    }
  };

  useEffect(() => {
    const getMovieId = async () => {
      const response = await axios.get(`${endpoint}${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNombre(response.data.pelicula.nombre);
      setAnio_estreno(response.data.pelicula.anio_estreno);
  
      // Obtener las categorías de la base de datos
      const categoriasResponse = await axios.get("http://localhost:8000/api/categorias", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCategorias(categoriasResponse.data);
  
      // Obtener las categorías asociadas a la película
      const categoriasAsociadas = await axios.get(`${endpoint}${id}/categorias`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Extraer los IDs de las categorías asociadas
      setCategoriasSeleccionadas(categoriasAsociadas.data.categorias.map(cat => cat.id));
    };
    getMovieId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h3>Editar película</h3>
      <form onSubmit={update}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            className="form-control"
          />
          {errors?.nombre && (
            <div className="text-danger">{errors.nombre[0]}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Año</label>
          <input
            value={anio_estreno}
            onChange={(e) => setAnio_estreno(e.target.value)}
            type="number"
            className="form-control"
          />
          {errors?.anio_estreno && (
            <div className="text-danger">{errors.anio_estreno[0]}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Portada</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPortadaFile(e.target.files[0])}
            className="form-control"
          />
          {errors?.portada && (
            <div className="text-danger">{errors.portada[0]}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Categorías</label>
          <div className="d-flex flex-wrap">
            {categorias.map((categoria) => (
              <div key={categoria.id} className="form-check me-3 mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`categoria-${categoria.id}`}
                  value={categoria.id}
                  checked={categoriasSeleccionadas.includes(categoria.id)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setCategoriasSeleccionadas((prevCategorias) =>
                      isChecked
                        ? [...prevCategorias, categoria.id]
                        : prevCategorias.filter(
                            (cat) => cat !== categoria.id
                          )
                    );
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={`categoria-${categoria.id}`}
                >
                  {categoria.nombre}
                </label>
              </div>
            ))}
          </div>
          {errors?.categorias && (
            <div className="text-danger">{errors.categorias[0]}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default MoviesEdit;
