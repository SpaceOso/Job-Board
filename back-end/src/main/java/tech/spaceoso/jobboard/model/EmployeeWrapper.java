package tech.spaceoso.jobboard.model;

import java.util.UUID;

public class EmployeeWrapper {
    private Employee employee;
    private UUID companyId;
    private Company company;

    // empty constructor for JPA
    public EmployeeWrapper(){}

    public EmployeeWrapper(Employee employee, UUID companyId) {
        this.employee = employee;
        this.companyId = companyId;
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
}
