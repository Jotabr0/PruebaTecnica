import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const endpoint = "http://localhost:8000/api/pelicula/";

const MoviesEdit = () => {
  const [nombre, setNombre] = useState("");
  const [anio_estreno, setAnio_estreno] = useState("");
  const [portadaFile, setPortadaFile] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("anio_estreno", anio_estreno);
    formData.append("portada", portadaFile);


    try {
        await axios.post(`${endpoint}${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
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
      const response = await axios.get(`${endpoint}${id}`);
      setNombre(response.data.pelicula.nombre);
      setAnio_estreno(response.data.pelicula.anio_estreno);
      //setPortada(response.data.pelicula.portada)
      console.log(response.data.pelicula);
    };
    getMovieId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Editar pelicula</h3>
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
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default MoviesEdit;
