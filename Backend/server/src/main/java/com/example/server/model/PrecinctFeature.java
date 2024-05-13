package com.example.server.model;

//This is a single precinct as a feature within the Features field in PrecinctGeoJSON.java
//It is identical to DistrictGeoJSON with the exception of a lack of a state field 
//State field is not needed because precinct data does not need to be broken up and queried

//TLDR: This exists ONLY to get the properties field to aggregate for districts
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "PrecinctGeoJSON2")
public class PrecinctFeature { 
    private String type;
    private Object geometry;
    private Properties properties;
    
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
    public Properties getProperties() {
        return properties;
    }
    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "PrecinctFeature [type=" + type + ", geometry=" + geometry + ", properties=" + properties + "]";
    }
}
