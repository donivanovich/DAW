package com.joyfe.introduccion.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Health {
    
    @GetMapping("health")
    public String getHealth() {
        return "API de Introducción Activa";
    }

    @GetMapping ("health/{id}")
    public String getHealthById(
        @PathVariable(name = "id") String id,
        @RequestParam(name = "param", required = false) String param
    ) {
        return "Health: " + id + " - Param: " + param;
    }
}
