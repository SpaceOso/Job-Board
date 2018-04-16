package tech.spaceoso.jobboard.model;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public class CompanyWrapper {
    private Company company;
    private UUID employeeId;


    public CompanyWrapper() {
    }

    public CompanyWrapper(Company company, UUID employeeId) {
        this.company = company;
        this.employeeId = employeeId;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public UUID getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(UUID employeeId) {
        this.employeeId = employeeId;
    }


}
