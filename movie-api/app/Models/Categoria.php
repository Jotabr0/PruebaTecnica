<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $fillable = ['nombre'];

    public function peliculas(){
        return $this->belongsToMany(Pelicula::class);
    }
}
