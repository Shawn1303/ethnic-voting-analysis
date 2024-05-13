package com.example.server.model;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "OppBarCharts")
public class OppBarChart {
    private String race;
    private String state;
    private int threshold;
    private Object opp_dist_freq;
    
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
    public int getThreshold() {
        return threshold;
    }
    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }
    public Object getOpp_dist_freq() {
        return opp_dist_freq;
    }
    public void setOpp_dist_freq(Object opp_dist_freq) {
        this.opp_dist_freq = opp_dist_freq;
    }

    @Override
    public String toString() {
        return "OppBarChart [race=" + race + ", state=" + state + ", threshold=" + threshold + ", opp_dist_freq="
                + opp_dist_freq + "]";
    }
}
