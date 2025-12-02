package com.levelup.backend.service;

import com.levelup.backend.entity.Orden;
import com.levelup.backend.repository.OrdenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class OrdenService {
    
    private final OrdenRepository repo;

    public List<Orden> listar(){
        return repo.findAll();
    }

    public Orden crear(Orden o){
        return repo.save(o);
    }

    public Orden buscar(Long id){
        return repo.findById(id)
            .orElseThrow(()-> new RuntimeException("Orden no encontrada"));
    }
}
