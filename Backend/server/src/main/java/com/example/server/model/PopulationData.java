package com.example.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "MapData")
public class PopulationData {
    private int ID;
    private int totalPopulation;
    private int whitePopulation;
    private int blackPopulation;
    private int hispanicLatinoPopulation;
    private int indianPopulation;
    private int asianPopulation;
    private int otherPopulation;
    
    public int getID() {
        return ID;
    }
    public void setID(int iD) {
        ID = iD;
    }
    public int getTotalPopulation() {
        return totalPopulation;
    }
    public void setTotalPopulation(int totalPopulation) {
        this.totalPopulation = totalPopulation;
    }
    public int getWhitePopulation() {
        return whitePopulation;
    }
    public void setWhitePopulation(int whitePopulation) {
        this.whitePopulation = whitePopulation;
    }
    public int getBlackPopulation() {
        return blackPopulation;
    }
    public void setBlackPopulation(int blackPopulation) {
        this.blackPopulation = blackPopulation;
    }
    public int getHispanicLatinoPopulation() {
        return hispanicLatinoPopulation;
    }
    public void setHispanicLatinoPopulation(int hispanicLatinoPopulation) {
        this.hispanicLatinoPopulation = hispanicLatinoPopulation;
    }
    public int getIndianPopulation() {
        return indianPopulation;
    }
    public void setIndianPopulation(int indianPopulation) {
        this.indianPopulation = indianPopulation;
    }
    public int getAsianPopulation() {
        return asianPopulation;
    }
    public void setAsianPopulation(int asianPopulation) {
        this.asianPopulation = asianPopulation;
    }
    public int getOtherPopulation() {
        return otherPopulation;
    }
    public void setOtherPopulation(int otherPopulation) {
        this.otherPopulation = otherPopulation;
    }
    @Override
    public String toString() {
        return "PopulationData [ID=" + ID + ", totalPopulation=" + totalPopulation + ", whitePopulation="
                + whitePopulation + ", blackPopulation=" + blackPopulation + ", hispanicLatinoPopulation="
                + hispanicLatinoPopulation + ", indianPopulation=" + indianPopulation + ", asianPopulation="
                + asianPopulation + ", otherPopulation=" + otherPopulation + "]";
    }
}
