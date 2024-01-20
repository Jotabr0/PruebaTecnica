import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const endpoint = "http://localhost:8000/api";

const MoviesTable = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [ultimoId, setUltimoId] = useState(null);

  useEffect(() => {
    getAllMovies();
    obtenerUltimoId();
    console.log(movies);
  }, [currentPage, searchTerm]);

  const getAllMovies = async () => {
    try {
      const response = await axios.get(`${endpoint}/peliculas`, {
        params: {
          page: currentPage,
          per_page: 5,
          nombre: searchTerm, // Añadir el parámetro de búsqueda
        },
      });

      const moviesData = response.data.data.map((movie) => {
        return {
          ...movie,
          categorias: (movie.categorias || []).map(
            (categoria) => categoria.nombre
          ),
        };
      });
      console.log("MOVIESDATA", moviesData);

      setMovies(moviesData);

      //setMovies(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
    }
  };

  const deleteMovie = async (id) => {
    await axios.delete(`${endpoint}/pelicula/${id}`);
    getAllMovies();
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const obtenerUltimoId = async () => {
    try {
      const response = await axios.get(`${endpoint}/ultima/pelicula`);
      const ultimoId = response.data;
      setUltimoId(ultimoId);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener el último ID de la película:", error);
    }
  };

  return (
    <div>
      <div className="d-grid gap-2">
        <Link
          to={ultimoId ? `/create/${ultimoId}` : "/create"}
          className="btn btn-success btn-lg mt-2 mb-2 text-white"
        >
          Create
        </Link>
      </div>

      <div className="mb-3">
        <label className="form-label">Buscar por nombre:</label>
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Año</th>
            <th>Portada</th>
            <th>Acciones</th>
            <th>Categorias</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.nombre}</td>
              <td>{movie.anio_estreno}</td>
              <td>
                <img
                  src={`http://localhost:8000/storage/${movie.portada}`}
                  alt={`Portada de ${movie.nombre}`}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              {/* <td>{movie.portada}</td> */}
              <td>
                <Link to={`/edit/${movie.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
              <td>
                <ul>
                  {movie.categorias.map((categoria, index) => (
                    <li key={index}>{categoria}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center">
        <button
          onClick={prevPage}
          className="btn btn-primary"
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="btn btn-primary"
          disabled={currentPage === totalPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default MoviesTable;
