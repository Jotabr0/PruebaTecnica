<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeliculaCategoria extends Model
{
    use HasFactory;

    protected $table = 'pelicula_categoria';
    protected $fillable = ['id_pelicula', 'id_categoria'];
}
