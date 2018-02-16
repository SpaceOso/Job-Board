package tech.spaceoso.jobboard.model;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import java.util.UUID;

@Entity
public class Location {
//    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    @Id
    private UUID id;
    public String street;
    public String city;
    public String state;
    public Integer zipCode;

    public Location(){};

    public Location(String street, String city, String state, int zipCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}
