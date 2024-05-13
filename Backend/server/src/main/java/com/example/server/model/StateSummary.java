package com.example.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "StateSummary")
public class StateSummary {
    private Object data;
    private String state;
    
    public Object getData() {
        return data;
    }
    public void setData(Object data) {
        this.data = data;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }
    @Override
    public String toString() {
        return "StateSummary [data=" + data + ", state=" + state + "]";
    }
}
