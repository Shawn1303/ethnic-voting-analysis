package com.example.server.model;

public class Demographics {
    private int democraticVotes;
    private int republicanVotes;
    private int totalVotes;
    private int demographicWhite;
    private int demographicBlack;
    private int demographicAsian;
    private int demographicHispanicLatino;
    private int demographicOther;
    private int demographicTotal;
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
        return "Demographics [democraticVotes=" + democraticVotes + ", republicanVotes=" + republicanVotes
                + ", totalVotes=" + totalVotes + ", demographicWhite=" + demographicWhite + ", demographicBlack="
                + demographicBlack + ", demographicAsian=" + demographicAsian + ", demographicHispanicLatino="
                + demographicHispanicLatino + ", demographicOther=" + demographicOther + ", demographicTotal="
                + demographicTotal + "]";
    }
}
