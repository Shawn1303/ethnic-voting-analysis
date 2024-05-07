package com.example.server.model;

import java.util.Set;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "MapData")
public class HeatMap {
    private String state;
    private Set<Object> features;
    private Set<PopulationData> populationData;
    
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public Set<Object> getFeatures() {
        return features;
    }
    public void setFeatures(Set<Object> features) {
        this.features = features;
    }
    public Set<PopulationData> getPopulationData() {
        return populationData;
    }
    public void setPopulationData(Set<PopulationData> populationData) {
        this.populationData = populationData;
    }

    @Override
    public String toString() {
        return "HeatMap [state=" + state + ", features=" + features + ", populationData=" + populationData + "]";
    }
}
