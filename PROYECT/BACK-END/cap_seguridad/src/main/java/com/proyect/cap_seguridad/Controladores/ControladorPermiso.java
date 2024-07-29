package com.proyect.cap_seguridad.Controladores;

import com.proyect.cap_seguridad.Modelos.Permiso;
import com.proyect.cap_seguridad.Repositorios.RepositorioPermiso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/permisos")
public class ControladorPermiso {
    @Autowired
    private RepositorioPermiso miRepositorioPermiso;

    @GetMapping("")
    public List<Permiso> index(){
        return this.miRepositorioPermiso.findAll();
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Permiso create(@RequestBody  Permiso infoPermiso){
        return this.miRepositorioPermiso.save(infoPermiso);
    }
    @GetMapping("{id}")
    public Permiso show(@PathVariable String id){
        Permiso permisoActual=this.miRepositorioPermiso
                .findById(id)
                .orElse(null);
        return permisoActual;
    }
    @PutMapping("{id}")
    public Permiso update(@PathVariable String id,@RequestBody  Permiso infoPermiso){
        Permiso permisoActual=this.miRepositorioPermiso.findById(id).orElse(null);
        if(permisoActual!=null){
            permisoActual.setMetodo(infoPermiso.getMetodo());
            permisoActual.setUrl(infoPermiso.getUrl());
            permisoActual.setDescripcion(infoPermiso.getDescripcion());
            return this.miRepositorioPermiso.save(permisoActual);
        }else{
            return null;
        }

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        Permiso permisoActual=this.miRepositorioPermiso
                .findById(id)
                .orElse(null);
        if (permisoActual!=null){
            this.miRepositorioPermiso.delete(permisoActual);
        }
    }
}
