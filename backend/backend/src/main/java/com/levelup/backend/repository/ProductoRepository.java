package com.levelup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.levelup.backend.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    
}
