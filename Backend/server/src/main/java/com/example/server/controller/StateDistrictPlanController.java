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

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StateDistrictPlanController {
    // @Autowired
    // StateDistrictPlanRepository stateDistrict;

    // @GetMapping("/districtPlan") 
    // @Cacheable("stateDistrictPlan")
    // public StateDistrictPlan getStateDistrictPlan(@RequestParam String state) 
    // {
    //     System.out.println(state);
    //     return stateDistrict.findByState(state); 
    // }

    @Autowired
    GeoJSONDocRepository geoJsonRepo;

    @GetMapping("/test")
    @Cacheable("test")
    public ResponseEntity<String> getStateDistrictPlanTest(@RequestParam String state) 
    {
        try {
            List<DistrictGeoJSON> districts = geoJsonRepo.findByState(state); 

            GeoJSONDoc geoJsonDoc = new GeoJSONDoc();
            geoJsonDoc.setType("FeatureCollection");
            geoJsonDoc.setFeatures(districts); 

            //Jackson serialization into JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String returnGeoJson = objectMapper.writeValueAsString(geoJsonDoc);

            return ResponseEntity.ok(returnGeoJson);
        }
        catch (Exception e) {
            return ResponseEntity.status(400).body("Failed to generate GeoJSON: " + e.getMessage());
        }
    }
}
