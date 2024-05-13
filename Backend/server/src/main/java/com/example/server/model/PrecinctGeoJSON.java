package com.example.server.model;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "PrecinctGeoJSON")
public class PrecinctGeoJSON {
    private String type;
    private String state;
    private List<PrecinctFeature> features; //each is one precinct
    
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public List<PrecinctFeature> getFeatures() {
        return features;
    }
    public void setFeatures(List<PrecinctFeature> features) {
        this.features = features;
    }
    
    @Override
    public String toString() {
        return "PrecinctGeoJSON [type=" + type + ", state=" + state + ", features=" + features + ", toString()="
                + super.toString() + "]";
    }
}
