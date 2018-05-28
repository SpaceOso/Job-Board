package tech.spaceoso.jobboard.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tech.spaceoso.jobboard.App;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
    private UUID id;
    
    @CreationTimestamp
    private LocalDateTime createdDate;
    
//    @Temporal(TemporalType.DATE)
    @UpdateTimestamp
    @Column(name = "lastModifiedDate")
    private LocalDateTime lastModifiedDate;
    
    private String title;
    
    @OneToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    @JsonBackReference(value ="job-company")
    private Company company;
    
    // @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // @JoinColumn(name = "applicant_id")
    // @JsonBackReference
    // private List<Applicant> applicants;
    

    public Job(){}

    public Job(UUID id, LocalDateTime createdDate, String title, Address address, String description, Company company) {
        this.id = id;
        this.createdDate = createdDate;
        this.title = title;
        this.address = address;
        this.description = description;
        this.company = company;
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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    
    // public List<Applicant> getApplicants() {
    //     return applicants;
    // }
    
    // public void setApplicants(List<Applicant> applicants) {
    //     this.applicants = applicants;
    // }
    
    
    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", createdDate=" + createdDate +
                ", lastModifiedDate=" + lastModifiedDate +
                ", title='" + title + '\'' +
                ", address=" + address +
                ", description='" + description + '\'' +
                ", company=" + company +
                '}';
    }
}
