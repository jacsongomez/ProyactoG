package com.proyect.cap_seguridad.Repositorios;

import com.proyect.cap_seguridad.Modelos.Rol;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioRol extends MongoRepository<Rol,String> {
}
