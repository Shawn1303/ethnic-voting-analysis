package com.example.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.repository.StateDistrictPlanRepository;
import com.example.server.model.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StateDistrictPlanController {
    @Autowired
    StateDistrictPlanRepository stateDistrict;

    @GetMapping("/mdDistrictPlan") //@GetMapping("/districtPlan") 3
    @Cacheable("stateDistrictPlan")
    public StateDistrictPlan getAllStateDistrictPlans() //getDistrictPlan(state) 4
    {
        return stateDistrict.findByName("MarylandDistrictPlan"); //findByName(state) 7
    }
}
