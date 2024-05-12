package com.example.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.PrecinctGeoJSON;

public interface PrecinctGeoJSONRespository extends MongoRepository<PrecinctGeoJSON, String> {
    PrecinctGeoJSON findByState (String state);
}
