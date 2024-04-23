package com.example.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.repository.StateDistrictPlanRepository;
import com.example.server.model.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StateDistrictPlanController {
    @Autowired
    StateDistrictPlanRepository stateDistrict;

    @GetMapping("/districtPlan") 
    @Cacheable("stateDistrictPlan")
    public StateDistrictPlan getStateDistrictPlan(@RequestParam String state) 
    {
        System.out.println(state);
        return stateDistrict.findByState(state); 
    }
}
