package tech.spaceoso.jobboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.UUID;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    private UUID id;
    private String title;
    @OneToOne(fetch = FetchType.LAZY, cascade={CascadeType.ALL})
    @JoinColumn(name = "address_id")
    private Address address;
    private String description;
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "employer_id")
    private Employer employer;


    public Job(){

    }
    public Job(UUID id, String title, Address address, String description) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.description = description;
    }

    public Job(UUID id, String title, Address address, String description, Employer employer) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.description = description;
        this.employer = employer;
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

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", address=" + address +
                ", description='" + description + '\'' +
                ", employer=" + employer +
                '}';
    }
}
