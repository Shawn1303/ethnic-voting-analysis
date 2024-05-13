package com.example.server.model;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "BoxWhiskers")
public class BoxWhisker {
    private String race;
    private String state;
    private Object buckets;
    
    public String getRace() {
        return race;
    }
    public void setRace(String race) {
        this.race = race;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public Object getBuckets() {
        return buckets;
    }
    public void setBuckets(Object buckets) {
        this.buckets = buckets;
    }

    @Override
    public String toString() {
        return "BoxWhisker [race=" + race + ", state=" + state + ", buckets=" + buckets + "]";
    }
}
