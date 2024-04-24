package com.example.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.Representative;

public interface RepresentativeRepository extends MongoRepository<Representative,String> {
    List<Representative> findByState (String state);
}
