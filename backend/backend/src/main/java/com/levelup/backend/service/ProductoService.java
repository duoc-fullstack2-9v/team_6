package com.levelup.backend.service;

import com.levelup.backend.entity.Producto;
import com.levelup.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor

public class ProductoService {
    
    private final ProductoRepository repo;

    public List<Producto> listar(){
        return repo.findAll();
    }

    public Producto crear(Producto p){
        return repo.save(p);
    }

    public Producto actualizar(Long id, Producto p){
        Producto existente= repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado!!"));

        existente.setCodigo(p.getCodigo());
        existente.setNombre(p.getNombre());
        existente.setDescripcion(p.getDescripcion());
        existente.setPrecio(p.getPrecio());
        existente.setStock(p.getStock());
        existente.setCategoria(p.getCategoria());
        existente.setImagen(p.getImagen());

        return repo.save(existente);
    }


    public void eliminar(Long id){
        repo.deleteById(id);
    }

    public Producto buscar(Long id){
        return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado!!"));
    }

}
