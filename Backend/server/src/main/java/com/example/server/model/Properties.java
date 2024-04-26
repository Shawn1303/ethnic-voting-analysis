package com.example.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DistrictGeoJSON")
public class Properties {
    private int districtN;

    public int getDistrictN() {
        return districtN;
    }

    public void setDistrictN(int districtN) {
        this.districtN = districtN;
    }

    @Override
    public String toString() {
        return "Properties [districtN=" + districtN + "]";
    }
}
