package tech.spaceoso.jobboard.model;

public class Location {
    private String street;
    private String city;
    private String state;
    private Integer zipCode;

    public Location(String street, String city, String state, int zipCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}
