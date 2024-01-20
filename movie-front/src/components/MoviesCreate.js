import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const endpoint = "http://localhost:8000/api/pelicula";
const MoviesCreate = () => {
  const [errors, setErrors] = useState({});
  const [nombre, setNombre] = useState("");
  const [anio_estreno, setAnio_estreno] = useState("");
  const [portada, setPortada] = useState("");
  const [portadaFile, setPortadaFile] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const navigate = useNavigate();
  const [peliculaId, setPeliculaId] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setPeliculaId(id);
    console.log(id);
  }, [id]);

  useEffect(() => {
    // Obtener las categorías de la base de datos
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/categorias`
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const store = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('anio_estreno', anio_estreno);
    formData.append('categorias', categoriasSeleccionadas); // Convertir a cadena si es necesario
  
    // Agregar la imagen solo si se ha seleccionado
    if (portadaFile) {
      formData.append('portada', portadaFile);
      console.log(portadaFile);
    }
  
    axios
      .post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

    // axios
    //   .post(endpoint, {
    //     nombre: nombre,
    //     anio_estreno: anio_estreno,
    //     portada: portadaFile,
    //     categorias: categoriasSeleccionadas,
    //   })

      .then((response) => {
        setErrors(null);
        console.log(response);
        // Obtener el ID de la película recién creada
        const idPelicula = peliculaId;
        console.log("Id de la pelicula", idPelicula);

        // Asociar categorías seleccionadas a la película
        axios
          .post(`${endpoint}/${idPelicula}/categorias`, {
            categorias: categoriasSeleccionadas,
          })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error("Error al asociar categorías a la película", error);
          });
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          // Manejar errores de validación
          setErrors(error.response.data.errors);
        } else {
          console.error("Error al guardar película", error);
        }
      });
  };

  return (
    <div>
      <h3>Añadir pelicula</h3>
      <form onSubmit={store}>
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
          {/* <input
            value={portada}
            onChange={(e) => setPortada(e.target.value)}
            type="text"
            className="form-control"
          /> */}
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
                        : prevCategorias.filter((cat) => cat !== categoria.id)
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

export default MoviesCreate;
