<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Pelicula;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class PeliculaController extends Controller
{

    // public function peliculas(): JsonResponse
    // {
    //     $peliculas = Pelicula::paginate(5);
    //     return response()->json($peliculas);
    // }

    public function peliculas(Request $request): JsonResponse
    {
        $query = Pelicula::query();

        // Filtrar por nombre si se proporciona un parámetro de búsqueda
        if ($request->has('nombre')) {
            $query->where('nombre', 'like', '%' . $request->input('nombre') . '%');
        }

        // Filtrar por categoría si se proporciona un parámetro de categoría
        if ($request->has('categoria')) {
            $categoria = $request->input('categoria');
            
            // Si la categoría es "Todas las categorías", no aplicar filtro por categoría
            if ($categoria !== "todas") {
                $query->whereHas('categorias', function ($categoriaQuery) use ($categoria) {
                    $categoriaQuery->where('nombre', $categoria);
                });
            }
        }

        $peliculas = $query->with('categorias')->paginate(5);
       // $peliculas = $query->paginate(5);

       

        return response()->json($peliculas);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $peliculas = Auth::user()->peliculas;

    //     // Filtros
    //     if ($request->has('categoria')) {
    //     $peliculas->whereHas('categorias', function ($query) use ($request) {
    //         $query->where('nombre', $request->categoria);
    //     });
    // }

    //  if ($request->has('nombre')) {
    //     $peliculas->where('nombre', 'like', '%' . $request->nombre . '%');
    // }

        $peliculas = $peliculas->get();

        return response()->json(['peliculas' => $peliculas], 200);
    }



    public function asociarCategorias(Request $request, $id)
{
    try {
        $categoriasSeleccionadas = $request->input('categorias', []);

        // Desasociar todas las categorías existentes de la película
        $pelicula = Pelicula::find($id);
        //$pelicula->categorias()->detach();

        // Asociar las categorías seleccionadas a la película
        $pelicula->categorias()->attach($categoriasSeleccionadas);

        return response()->json(['message' => 'Categorías asociadas con éxito']);
    } catch (\Exception $e) {
        \Log::error('Error al asociar categorías a la película:', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Error al asociar categorías a la película'], 500);
    }
}

    public function ultimoId(): JsonResponse
{
    try {
        $ultimoId = Pelicula::latest('id')->pluck('id')->first();
        $ultimoId=$ultimoId+1;
        
        // Verificar si se obtuvo un resultado válido
        if ($ultimoId !== null) {
            return response()->json($ultimoId);
        } else {
            return response()->json(['error' => 'No se encontraron películas'], 404);
        }
    } catch (\Exception $e) {
        \Log::error('Error al obtener el último ID:', ['error' => $e->getMessage()]);
        return response()->json(['error' => $e->getMessage()], 500);
    }
}






    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'nombre'=>'required|string',
            'anio_estreno'=>'required|integer',
            'portada'=>'required|image|mimes:jpeg,png,jpg,gif',
            'categorias'=>'required|string|min:1'
        ], [
            'categorias.min' => 'Debe seleccionar al menos una categoría.',
        ]);

        $portadaPath = $request->file('portada')->store('portadas', 'public');

        $pelicula = new Pelicula();
        $pelicula->nombre=$request->nombre;
        $pelicula->anio_estreno=$request->anio_estreno;
        $pelicula->portada = $portadaPath;
        
        // $pelicula->portada=$request->portada;

        $pelicula->save();
        
       
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pelicula = Pelicula::find($id);

        return response()->json(['pelicula'=>$pelicula],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
        // Validación
        $rules = [
            'nombre'=>'string',
            'anio_estreno'=>'required|integer',
            // //'portada'=>'string',
            // 'portada' => 'sometimes|image|mimes:jpeg,png,jpg,gif',
            'categorias'=>'array'
        ];

        // Verificar si se proporcionó una nueva portada en la solicitud
        if ($request->hasFile('portada')) {
            $rules['portada'] = 'image|mimes:jpeg,png,jpg,gif';
        }
        //Validacion
        $request->validate($rules);

        // Obtener la película existente
        $pelicula = Pelicula::find($id);

        // Actualizar los campos de la película según la solicitud
        $pelicula->nombre = $request->input('nombre', $pelicula->nombre);
        $pelicula->anio_estreno = $request->input('anio_estreno', $pelicula->anio_estreno);

        // Verificar si se proporcionó una nueva portada en la solicitud
        if ($request->hasFile('portada')) {
            // Subir la nueva portada y almacenar la ruta
            $portadaPath = $request->file('portada')->store('portadas', 'public');
            // Actualizar la portada en la película
            $pelicula->portada = $portadaPath;
        }

        // Guardar los cambios en la película
        $pelicula->save();

        // Actualizar las categorías si se proporcionan en la solicitud
        if ($request->has('categorias')) {
            $pelicula->categorias()->sync($request->input('categorias'));
        }

        return response()->json(['pelicula' => $pelicula], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //Borrado logico
        $pelicula = Pelicula::find($id);
        $pelicula->delete();

        return response()->json(['message'=>'Pelicula borrada correctamente'],200);

    }
}
