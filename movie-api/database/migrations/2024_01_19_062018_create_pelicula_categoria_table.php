<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('pelicula_categoria', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_pelicula');
            $table->unsignedBigInteger('id_categoria');
            $table->timestamps();

            $table->foreign('id_pelicula')->references('id')->on('peliculas')->onDelete('cascade');
            $table->foreign('id_categoria')->references('id')->on('categorias')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelicula_categoria');
    }
};
