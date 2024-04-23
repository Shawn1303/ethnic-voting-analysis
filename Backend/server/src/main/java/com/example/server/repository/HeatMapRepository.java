package com.example.server.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.server.model.HeatMap;

public interface HeatMapRepository extends MongoRepository<HeatMap, String> {
    HeatMap findByState(String state);
}