package tech.spaceoso.jobboard.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Applicant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @org.hibernate.annotations.Type(type = "org.hibernate.type.PostgresUUIDType")
    private UUID id;
    
    @CreationTimestamp
    private LocalDateTime createdDate;
    @UpdateTimestamp
    private LocalDateTime lastModifiedDate;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String resume;
    private String website;
    private String status;
    private Boolean reviewed;
    private String coverLetter;
    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinTable(
            name="JOBS_APPLIED",
            joinColumns = @JoinColumn(name="APPLICANT_ID"),
            inverseJoinColumns = @JoinColumn(name="JOB_ID")
    )
    private List<Job> jobs;
    
    public Applicant(){};
    
    public Applicant(Address address, String firstName, String lastName, String email, String phoneNumber, String resume, String website, Boolean reviewed, String coverLetter) {
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.resume = resume;
        this.website = website;
        this.reviewed = reviewed;
        this.coverLetter = coverLetter;
    }
    
    public Applicant(UUID id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, Address address, String firstName, String lastName, String email, String phoneNumber, String resume, String website, Boolean reviewed, String coverLetter, List<Job> jobs) {
        this.id = id;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.resume = resume;
        this.website = website;
        this.reviewed = reviewed;
        this.coverLetter = coverLetter;
        this.jobs = jobs;
    }
    
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
    
    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
    
    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }
    
    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
    
    public Address getAddress() {
        return address;
    }
    
    public void setAddress(Address address) {
        this.address = address;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getResume() {
        return resume;
    }
    
    public void setResume(String resume) {
        this.resume = resume;
    }
    
    public String getWebsite() {
        return website;
    }
    
    public void setWebsite(String website) {
        this.website = website;
    }
    
    public Boolean getReviewed() {
        return reviewed;
    }
    
    public void setReviewed(Boolean reviewed) {
        this.reviewed = reviewed;
    }
    
    public String getCoverLetter() {
        return coverLetter;
    }
    
    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }
    
    public List<Job> getJobs() {
        return jobs;
    }
    
    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }
}
