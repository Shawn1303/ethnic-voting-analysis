package com.example.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.repository.*;
import com.example.server.model.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RepresentativeController {
    @Autowired
    RepresentativeRepository repRepo;

    @GetMapping("/stateAssemblyTable")
    @Cacheable("stateAssemblyTable")
    public List<Representative> getStateAssemblyTableList(@RequestParam String state) {
        return repRepo.findByState(state);
    }
}
