package com.example.server.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.server.model.StateDistrictPlan;

public interface StateDistrictPlanRepository extends MongoRepository<StateDistrictPlan, String> {
    StateDistrictPlan findByState(String state);
}
