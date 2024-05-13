package com.example.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.OppMap;

public interface OppMapRepository extends MongoRepository<OppMap, String> {
    OppMap findByStateAndRaceAndMode(String state, String race, String mode);
}
