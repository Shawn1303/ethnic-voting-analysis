package com.example.server.model;

import java.util.Map;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "state_district_plans")
public class StateDistrictPlan {
    // private String type;
    private String name;
    // private Map<String, Object> crs;
    private List<Object> features;

    // public String getType() {
    //     return type;
    // }
    // public void setType(String type) {
    //     this.type = type;
    // }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    // public Map<String, Object> getCrs() {
    //     return crs;
    // }
    // public void setCrs(Map<String, Object> crs) {
    //     this.crs = crs;
    // }

    public List<Object> getFeatures() {
        return features;
    }
    public void setFeatures(List<Object> features) {
        this.features = features;
    }
    @Override
    public String toString() {
        return "StateDistrictPlan [name=" + name + ", features=" + features + "]";
    }
    
    
    
}
