package com.example.server.controller;

import java.util.ArrayList;
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
public class MapController {
    @Autowired
    GeoJSONDocRepository geoJsonRepo;

    @Autowired
    PrecinctGeoJSONRespository precinctGeoJson;

    @GetMapping("/districtPlan")
    @Cacheable("stateDistrictPlan") //TODO aggregate then add precinct population data
    public ResponseEntity<String> getStateDistrictPlanTest(@RequestParam String state) 
    {
        try {
            List<DistrictGeoJSON> districts = geoJsonRepo.findByState(state); 
            for (DistrictGeoJSON district : districts) {
                String districtID = district.getProperties().getDistrictN();
                System.out.println(districtID);

                PrecinctGeoJSON statePrecincts = precinctGeoJson.findByState(state);
                List<PrecinctFeature> dP = statePrecincts.getFeatures();
                List<PrecinctFeature> districtPrecincts = new ArrayList<>(dP);

                Properties stats = new Properties();
                int democraticVotes = 0;
                int republicanVotes= 0;
                int totalVotes= 0;
                int demographicWhite= 0;
                int demographicBlack= 0;
                int demographicAsian= 0;
                int demographicHispanicLatino= 0;
                int demographicOther= 0;
                int demographicTotal= 0;
                for (PrecinctFeature pf : districtPrecincts) {
                    Properties pfProps = pf.getProperties();
                    if (pfProps.getDistrictN().equals(districtID)) { //precinct is in district
                        democraticVotes += pfProps.getDemocraticVotes();
                        republicanVotes += pfProps.getRepublicanVotes();
                        totalVotes += pfProps.getTotalVotes();
                        demographicWhite += pfProps.getDemographicWhite();
                        demographicBlack += pfProps.getDemographicBlack();
                        demographicAsian += pfProps.getDemographicAsian();
                        demographicHispanicLatino += pfProps.getDemographicHispanicLatino();
                        demographicOther += pfProps.getDemographicOther();
                        demographicTotal += pfProps.getDemographicTotal();
                    }
                }
                stats.setDemocraticVotes(democraticVotes);
                stats.setRepublicanVotes(republicanVotes);
                stats.setTotalVotes(totalVotes);
                stats.setDemographicWhite(demographicWhite);
                stats.setDemographicBlack(demographicBlack);
                stats.setDemographicAsian(demographicAsian);
                stats.setDemographicHispanicLatino(demographicHispanicLatino);
                stats.setDemographicOther(demographicOther);
                stats.setDemographicTotal(demographicTotal);
                stats.setDistrictN(districtID);
                district.setProperties(stats);
            }

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

    @GetMapping("/heatMapP") 
    @Cacheable("precinctPlan") //this already has the population data in properties
    public PrecinctGeoJSON getPrecinctPlan(@RequestParam String state) {
        return precinctGeoJson.findByState(state);
    }
}
