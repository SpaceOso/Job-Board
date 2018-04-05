package tech.spaceoso.jobboard.model;

import java.util.UUID;

public class EmployeeWrapper {
    private Employee employee;
    private UUID companyId;
    private Company company;
    private String token;

    // empty constructor for JPA
    public EmployeeWrapper(){}

    public EmployeeWrapper(Employee employee){
        this.employee = employee;
    }


    public EmployeeWrapper(Employee employee, UUID companyId, String token) {
        this.employee = employee;
        this.companyId = companyId;
        this.token = token;

    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public UUID getCompanyId() {
        return companyId;
    }

    public void setCompanyId(UUID companyId) {
        this.companyId = companyId;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}