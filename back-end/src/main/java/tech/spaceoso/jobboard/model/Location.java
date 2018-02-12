package tech.spaceoso.jobboard.model;

public class Location {
    public String street;
    public String city;
    public String state;
    public Integer zipCode;

    public Location(String street, String city, String state, int zipCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}
