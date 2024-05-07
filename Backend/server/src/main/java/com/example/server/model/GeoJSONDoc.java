package com.example.server.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DistrictGeoJSON")
public class GeoJSONDoc { 
    //This is the GEOJson Format that contains ALL districts. 
    //It is written to in the StateDistrictPlanController
    @JsonProperty("type")
    private String type;
    @JsonProperty("features")
    private List<DistrictGeoJSON> features;
    
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public List<DistrictGeoJSON> getFeatures() {
        return features;
    }
    public void setFeatures(List<DistrictGeoJSON> features) {
        this.features = features;
    }
    @Override
    public String toString() {
        return "DistrictGeoJSONDoc [type=" + type + ", features=" + features + "]";
    }
}
