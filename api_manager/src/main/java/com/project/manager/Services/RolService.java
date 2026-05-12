package com.project.manager.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.manager.Models.Rol;
import com.project.manager.Repositories.RolRepository;

@Service
public class RolService {
    @Autowired private RolRepository rolRepository;

    public List<Rol> all() {
        return rolRepository.findAll();
    }

    public Rol save(Rol rol) {
        // Validar que el nombre y la descripción no sean nulos o vacíos
        if(rol.getName() == null || rol.getName().isEmpty()) {
            throw new IllegalArgumentException("El nombre del rol no puede ser nulo o vacío");
        }

        if (rol.getDescription() == null || rol.getDescription().isEmpty()) {
            throw new IllegalArgumentException("La descripción del rol no puede ser nula o vacía");
        }
        // Crear un nuevo objeto Rol para evitar modificar el objeto original
        Rol newRol = new Rol();
        newRol.setName(rol.getName());
        newRol.setDescription(rol.getDescription());
        // Guardar el nuevo rol en la base de datos
        return rolRepository.save(newRol);
    }
}
