package com.example.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.repository.HeatMapRepository;
import com.example.server.model.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HeatMapController {
    @Autowired
    HeatMapRepository heatMap;

    @GetMapping("/heatMap")
    @Cacheable("heatMap")
    public HeatMap getHeatMap(@RequestParam String state) 
    {
        System.out.println(state);
        return heatMap.findByState(state); 
    }
}
