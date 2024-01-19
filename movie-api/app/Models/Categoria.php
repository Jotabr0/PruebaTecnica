<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;

class Categoria extends Model
{
    protected $table='categorias';
    protected $fillable = ['nombre'];

    public function peliculas(){
        return $this->belongsToMany(Pelicula::class, 'pelicula_categoria', 'id_categoria', 'id_pelicula');
    }
}
