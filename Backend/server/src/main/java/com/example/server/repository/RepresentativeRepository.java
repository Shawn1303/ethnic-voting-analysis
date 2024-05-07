package com.example.server.repository;

import java.util.Set;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.Representative;

public interface RepresentativeRepository extends MongoRepository<Representative,String> {
    Set<Representative> findByState (String state);
}
