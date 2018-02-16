package tech.spaceoso.jobboard.model;

import com.fasterxml.jackson.annotation.JsonValue;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Job {
//    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID id;
    private String title;
//    private Location location;
    private String description;
    private Long employerId;
//    @OneToOne
//    private Employer employer;

    public Job(){

    }


    public Job(UUID id, String title, String description, Long employerId) {
        this.id = id;
        this.title = title;
//        this.location = location;
        this.description = description;
        this.employerId = employerId;
//        this.employer = employer;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

//    public Location getLocation() {
//        return location;
//    }

//    public void setLocation(Location location) {
//        this.location = location;
//    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getEmployerId() {
        return employerId;
    }

    public void setEmployerId(Long employerId) {
        this.employerId = employerId;
    }

//    public Employer getEmployer() {
//        return employer;
//    }

//    public void setEmployer(Employer employer) {
//        this.employer = employer;
//    }
}
