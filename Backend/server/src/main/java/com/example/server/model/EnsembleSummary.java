package com.example.server.model;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "EnsembleSummary")
public class EnsembleSummary {
    private int district_plans;
    private Object race_opp_dist;
    private Object splits;
    private String state;
    
    public int getDistrict_plans() {
        return district_plans;
    }
    public void setDistrict_plans(int district_plans) {
        this.district_plans = district_plans;
    }
    public Object getRace_opp_dist() {
        return race_opp_dist;
    }
    public void setRace_opp_dist(Object race_opp_dist) {
        this.race_opp_dist = race_opp_dist;
    }
    public Object getSplits() {
        return splits;
    }
    public void setSplits(Object splits) {
        this.splits = splits;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    
    @Override
    public String toString() {
        return "EnsembleSummary [district_plans=" + district_plans + ", race_opp_dist=" + race_opp_dist + ", splits="
                + splits + ", state=" + state + "]";
    }
}
