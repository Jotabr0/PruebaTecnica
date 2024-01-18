<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PeliculaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $peliculas = Auth::user()->peliculas;

        // Filtros
        if ($request->has('categoria')) {
        $peliculas->whereHas('categorias', function ($query) use ($request) {
            $query->where('nombre', $request->categoria);
        });
    }

     if ($request->has('nombre')) {
        $peliculas->where('nombre', 'like', '%' . $request->nombre . '%');
    }

        $peliculas = $peliculas->get();

        return response()->json(['peliculas' => $peliculas], 200);
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
        //Validacion
        $request->validate([
            'nombre'=>'required|string',
            'anio_estreno'=>'required|integer',
            'portada'=>'required|image|mimes:jpeg,png,jpg,gif',
            'categorias'=>'required|array|min:1'
        ]);

        //Usuario identificado
        $user = Auth::user();

        // Crear una nueva película asociada al usuario
        $pelicula = $user->peliculas()->create([
        'nombre' => $request->nombre,
        'anio_estreno' => $request->anio_estreno,
        'portada' => $portadaPath,
        ]);

        //Asociar categoria/s a la pelicula
        $pelicula->categorias()->attach($request->categorias);

        return response()->json(['pelicula'=>$pelicula],201);
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //Validacion
        $request->validate([
            'nombre'=>'string',
            'anio_estreno'=>'integer',
            'portada'=>'image|mimes:jpeg,png,jpg,gif',
            'categorias'=>'array'
        ]);

        //Actualizar pelicula
        $pelicula = Pelicula::find($id);

        $pelicula->update([
            'nombre' => $request->nombre ?? $pelicula->nombre,
            'anio_estreno' => $request->anio_estreno ?? $pelicula->anio_estreno,
            'portada' => $request->file('portada') ? $request->file('portada')->store('portadas') : $pelicula->portada,
        ]);

        //Actualizar categorias
        if($request->categorias){
            $pelicula->categorias()->sync($request->categorias);
        }

        return response()->json(['pelicula' => $pelicula,200]);
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
