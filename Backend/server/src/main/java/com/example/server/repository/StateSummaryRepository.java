package com.example.server.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.StateSummary;

public interface StateSummaryRepository extends MongoRepository<StateSummary, String> {
    StateSummary findByState (String state);
}
