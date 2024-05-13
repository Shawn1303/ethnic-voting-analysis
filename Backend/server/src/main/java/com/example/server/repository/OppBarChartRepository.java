package com.example.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.model.OppBarChart;

public interface OppBarChartRepository extends MongoRepository<OppBarChart,String> {
    List<OppBarChart> findByStateAndRace (String state, String race);
    List<OppBarChart> findByStateAndThreshold (String state, int threshold);
}
