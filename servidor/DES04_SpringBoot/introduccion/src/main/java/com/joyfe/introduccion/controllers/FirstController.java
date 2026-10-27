package com.joyfe.introduccion.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RequestMapping("/recursos")
@RestController 
public class FirstController {

    private String nameStored = "";

    @PostMapping
    public void crearRecurso(@RequestParam String name){
        nameStored = name;
    }
    
    @GetMapping
    public String obtenerRecurso(){
        return "Hola " + nameStored;
    }

    @PutMapping
    public String actualizarRecurso(@RequestParam String name){
        nameStored = name;
        return "Recurso actualizado: " + nameStored;
    }

    @DeleteMapping
    public void borrarRecurso(){
        nameStored = "";
    }
}
