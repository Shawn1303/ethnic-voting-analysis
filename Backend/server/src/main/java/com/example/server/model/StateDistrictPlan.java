package com.example.server.model;

import java.util.Set;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "StateDistrictPlan")
public class StateDistrictPlan {
    private String state;
    private Set<Object> features;

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

    @Override
    public String toString() {
        return "StateDistrictPlan [state=" + state + ", features=" + features + "]";
    }
    
    
    
}
