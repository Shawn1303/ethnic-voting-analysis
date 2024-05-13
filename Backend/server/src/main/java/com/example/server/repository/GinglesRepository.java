package com.example.server.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.Gingles;

public interface GinglesRepository extends MongoRepository<Gingles, String> {
    Gingles findByState (String state);
}
