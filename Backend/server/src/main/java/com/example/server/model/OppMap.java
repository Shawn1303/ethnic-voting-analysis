package com.example.server.model;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "OppMaps")
public class OppMap {
    private String state;
    private String mode;
    private String race;
    private String type;
    private Object features;
    
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public String getMode() {
        return mode;
    }
    public void setMode(String mode) {
        this.mode = mode;
    }
    public String getRace() {
        return race;
    }
    public void setRace(String race) {
        this.race = race;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public Object getFeatures() {
        return features;
    }
    public void setFeatures(Object features) {
        this.features = features;
    }

    @Override
    public String toString() {
        return "OppMap [state=" + state + ", mode=" + mode + ", race=" + race + ", type=" + type + ", features="
                + features + "]";
    }
}
