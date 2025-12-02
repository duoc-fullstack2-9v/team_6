package com.levelup.backend.service;

import com.levelup.backend.entity.Usuario;
import com.levelup.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository repo;

    public List<Usuario> listar(){
        return repo.findAll();
    }

    public Usuario buscar (Long id){
        return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public Usuario crear(Usuario u) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        u.setPassword(encoder.encode(u.getPassword()));

        return repo.save(u);
    }

    public Usuario actualizar(Long id, Usuario u) {
        Usuario existente = buscar(id);

        existente.setNombre(u.getNombre());
        existente.setApellidos(u.getApellidos());
        existente.setCorreo(u.getCorreo());
        existente.setPassword(u.getPassword());  // Después lo encriptamos
        existente.setRol(u.getRol());

        return repo.save(existente);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public Usuario buscarPorCorreo(String correo){
        return repo.findByCorreo(correo)
            .orElse(null);
    }
}
