package com.levelup.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data

public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer stock;
    private String categoria;
    private String imagen;   
}
