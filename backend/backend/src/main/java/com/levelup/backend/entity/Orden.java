package com.levelup.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;


@Entity
@Data

public class Orden {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;
    private Double total;

    //@Temporal(TemporalType.TIMESTAMP)
    private Date fecha = new Date();

    private String estado;
}
