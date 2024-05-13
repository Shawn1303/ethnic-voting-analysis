package com.example.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.BoxWhisker;

public interface BoxWhiskerRepository extends MongoRepository<BoxWhisker, String> {
    List<BoxWhisker> findByState(String state);
    BoxWhisker findByStateAndRace(String state, String race);
}