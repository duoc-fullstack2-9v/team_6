package com.levelup.backend.controller;

import com.levelup.backend.entity.Usuario;
import com.levelup.backend.service.UsuarioService;
import com.levelup.backend.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder;

    @PostMapping("/login")
    public String login(@RequestBody Usuario u) {

        Usuario usuarioDB = usuarioService.buscarPorCorreo(u.getCorreo());

        if (!encoder.matches(u.getPassword(), usuarioDB.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return jwtUtil.generarToken(
                usuarioDB.getCorreo(),
                usuarioDB.getRol().name()
        );
    }
}
