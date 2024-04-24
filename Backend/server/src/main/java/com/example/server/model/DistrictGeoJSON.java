package com.example.server.model;
import java.util.Set;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "test")
public class DistrictGeoJSON { //This is the GeoJSON format for ONE district
    private String type;
    private Object geometry;
    private Object properties;
    private String state;
    
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public Object getGeometry() {
        return geometry;
    }
    public void setGeometry(Object geometry) {
        this.geometry = geometry;
    }
    public Object getProperties() {
        return properties;
    }
    public void setProperties(Object properties) {
        this.properties = properties;
    }
    @Override
    public String toString() {
        return "DistrictGeoJSON [type=" + type + ", geometry=" + geometry + ", properties=" + properties + ", state="
                + state + "]";
    }
}
