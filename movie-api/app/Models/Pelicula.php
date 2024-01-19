<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pelicula extends Model
{

    use SoftDeletes;
    protected $dates = ['deleted_at'];
    
    protected $table='peliculas';
    protected $fillable = ['nombre', 'anio_estreno', 'portada','user_id'];

    public function categorias(){
        return $this->belongsToMany(Categoria::class, 'pelicula_categoria', 'id_pelicula', 'id_categoria');
    }
}
