package com.example.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.DistrictGeoJSON;

public interface GeoJSONDocRepository extends MongoRepository<DistrictGeoJSON, String> {
    List<DistrictGeoJSON> findByState (String state);
}
