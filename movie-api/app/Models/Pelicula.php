<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelicula extends Model
{
    protected $fillable = ['nombre', 'anio_estreno', 'portada','user_id'];

    public function categorias(){
        return $this->belongsToMany(Categoria::class);
    }
}
