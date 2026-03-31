package com.levelup.backend.controller;

import com.levelup.backend.entity.Orden;
import com.levelup.backend.service.OrdenService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ordenes")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrdenController {

    private final OrdenService service;

    @GetMapping
    public List<Orden> listar() {
        return service.listar();
    }

    @PostMapping
    public Orden crear(@RequestBody Orden o) {
        return service.crear(o);
    }

    @GetMapping("/{id}")
    public Orden buscar(@PathVariable Long id) {
        return service.buscar(id);
    }
}
