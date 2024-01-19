import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

const endpoint = 'http://localhost:8000/api/pelicula/'

const MoviesEdit = () => {
    const [nombre,setNombre] = useState('');
    const [anio_estreno,setAnio_estreno] = useState('');
    const [portada,setPortada] = useState('');
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`,{
            nombre : nombre,
            anio_estreno : anio_estreno,
            portada : portada
        })
        navigate('/')
    }

    useEffect( ()=>{
        const getMovieId = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setNombre(response.data.pelicula.nombre)
            setAnio_estreno(response.data.pelicula.anio_estreno)
            setPortada(response.data.pelicula.portada)
            console.log(response.data.pelicula)
        }
        getMovieId() 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] )

    return (
        <div>
        <h3>Editar pelicula</h3>
        <form onSubmit={update}>
            <div className='mb-3'>
                <label className='form-label'>Nombre</label>
                <input
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                    type='text'
                    className='form-control'

                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Año</label>
                <input
                    value={anio_estreno}
                    onChange={(e)=> setAnio_estreno(e.target.value)}
                    type='number'
                    className='form-control'

                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Portada</label>
                <input
                    value={portada}
                    onChange={(e)=> setPortada(e.target.value)}
                    type='text'
                    className='form-control'

                />
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
    </div>
    )
}

export default MoviesEdit