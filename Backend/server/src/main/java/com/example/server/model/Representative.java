package com.example.server.model;
import java.net.URL;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Representatives")
public class Representative {
    private int districtN; //probably change to state because of md district ids
    private String name;
    private Party party;
    private Race race;
    private float voteMargin;
    private URL url;
    private String state;
    
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    public URL getUrl() {
        return url;
    }
    public void setUrl(URL url) {
        this.url = url;
    }
    public int getDistrictN() {
        return districtN;
    }
    public void setDistrictN(int districtN) {
        this.districtN = districtN;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Party getParty() {
        return party;
    }
    public void setParty(Party party) {
        this.party = party;
    }
    public Race getRace() {
        return race;
    }
    public void setRace(Race race) {
        this.race = race;
    }
    public float getVoteMargin() {
        return voteMargin;
    }
    public void setVoteMargin(float voteMargin) {
        this.voteMargin = voteMargin;
    }
    
    @Override
    public String toString() {
        return "Representative [districtN=" + districtN + ", name=" + name + ", party=" + party + ", race=" + race
                + ", voteMargin=" + voteMargin + ", url=" + url + ", state=" + state + "]";
    }
    
}
