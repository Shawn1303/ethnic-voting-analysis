package com.example.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.EnsembleSummary;

public interface EnsembleSummaryRepository extends MongoRepository<EnsembleSummary, String> {
    EnsembleSummary findByState(String state);
}
