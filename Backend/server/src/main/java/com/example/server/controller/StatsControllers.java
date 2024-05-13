package com.example.server.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.repository.*;
import com.example.server.model.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StatsControllers {
    @Autowired
    RepresentativeRepository repRepo;

    @GetMapping("/stateAssemblyTable")
    @Cacheable("stateAssemblyTable")
    public Set<Representative> getStateAssemblyTableList(@RequestParam String state) {
        return repRepo.findByState(state);
    }


    @Autowired
    StateSummaryRepository stateSumRepo;

    @GetMapping("/stateSummary")
    @Cacheable("stateSummary")
    public StateSummary getStateSummary(@RequestParam String state) {
        return stateSumRepo.findByState(state);
    }


    @Autowired
    GinglesRepository ginglesRepo;

    @GetMapping("/gingles")
    @Cacheable("gingles")
    public Gingles getGingles(@RequestParam String state) {
        return ginglesRepo.findByState(state);
    }
}
