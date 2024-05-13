package com.example.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "PrecinctGeoJSON2")
public class Properties {
    private String districtN;
    private String precinctName;
    private int precinctID;
    private int democraticVotes;
    private int republicanVotes;
    private int totalVotes;
    private int demographicWhite;
    private int demographicBlack;
    private int demographicAsian;
    private int demographicHispanicLatino;
    private int demographicOther;
    private int demographicTotal;
    
    public String getDistrictN() {
        return districtN;
    }
    public void setDistrictN(String districtN) {
        this.districtN = districtN;
    }
    public String getPrecinctName() {
        return precinctName;
    }
    public void setPrecinctName(String precinctName) {
        this.precinctName = precinctName;
    }
    public int getPrecinctID() {
        return precinctID;
    }
    public void setPrecinctID(int precinctID) {
        this.precinctID = precinctID;
    }
    public int getDemocraticVotes() {
        return democraticVotes;
    }
    public void setDemocraticVotes(int democraticVotes) {
        this.democraticVotes = democraticVotes;
    }
    public int getRepublicanVotes() {
        return republicanVotes;
    }
    public void setRepublicanVotes(int republicanVotes) {
        this.republicanVotes = republicanVotes;
    }
    public int getTotalVotes() {
        return totalVotes;
    }
    public void setTotalVotes(int totalVotes) {
        this.totalVotes = totalVotes;
    }
    public int getDemographicWhite() {
        return demographicWhite;
    }
    public void setDemographicWhite(int demographicWhite) {
        this.demographicWhite = demographicWhite;
    }
    public int getDemographicBlack() {
        return demographicBlack;
    }
    public void setDemographicBlack(int demographicBlack) {
        this.demographicBlack = demographicBlack;
    }
    public int getDemographicAsian() {
        return demographicAsian;
    }
    public void setDemographicAsian(int demographicAsian) {
        this.demographicAsian = demographicAsian;
    }
    public int getDemographicHispanicLatino() {
        return demographicHispanicLatino;
    }
    public void setDemographicHispanicLatino(int demographicHispanicLatino) {
        this.demographicHispanicLatino = demographicHispanicLatino;
    }
    public int getDemographicOther() {
        return demographicOther;
    }
    public void setDemographicOther(int demographicOther) {
        this.demographicOther = demographicOther;
    }
    public int getDemographicTotal() {
        return demographicTotal;
    }
    public void setDemographicTotal(int demographicTotal) {
        this.demographicTotal = demographicTotal;
    }

    @Override
    public String toString() {
        return "Properties [districtN=" + districtN + ", precinctName=" + precinctName + ", precinctID=" + precinctID
                + ", democraticVotes=" + democraticVotes + ", republicanVotes=" + republicanVotes + ", totalVotes="
                + totalVotes + ", demographicWhite=" + demographicWhite + ", demographicBlack=" + demographicBlack
                + ", demographicAsian=" + demographicAsian + ", demographicHispanicLatino=" + demographicHispanicLatino
                + ", demographicOther=" + demographicOther + ", demographicTotal=" + demographicTotal + "]";
    }
}
